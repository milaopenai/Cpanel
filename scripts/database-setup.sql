-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
    
    PRIMARY KEY (id)
);

-- Create sites table
CREATE TABLE IF NOT EXISTS public.sites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    description TEXT,
    template TEXT,
    category TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
    visits_today INTEGER DEFAULT 0,
    last_backup TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID REFERENCES public.sites ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content JSONB,
    meta_title TEXT,
    meta_description TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(site_id, slug)
);

-- Create plugins table
CREATE TABLE IF NOT EXISTS public.plugins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    version TEXT,
    author TEXT,
    category TEXT,
    price DECIMAL(10,2) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_plugins table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.site_plugins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID REFERENCES public.sites ON DELETE CASCADE NOT NULL,
    plugin_id UUID REFERENCES public.plugins ON DELETE CASCADE NOT NULL,
    active BOOLEAN DEFAULT true,
    settings JSONB,
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(site_id, plugin_id)
);

-- Create backups table
CREATE TABLE IF NOT EXISTS public.backups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID REFERENCES public.sites ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    size_mb DECIMAL(10,2),
    file_path TEXT,
    type TEXT DEFAULT 'full' CHECK (type IN ('full', 'files', 'database')),
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID REFERENCES public.sites ON DELETE CASCADE NOT NULL,
    page_path TEXT,
    visitor_ip TEXT,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    device_type TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Sites policies
CREATE POLICY "Users can view own sites" ON public.sites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create sites" ON public.sites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sites" ON public.sites
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sites" ON public.sites
    FOR DELETE USING (auth.uid() = user_id);

-- Pages policies
CREATE POLICY "Users can manage pages of own sites" ON public.pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.sites 
            WHERE sites.id = pages.site_id 
            AND sites.user_id = auth.uid()
        )
    );

-- Plugins policies (public read access)
CREATE POLICY "Anyone can view plugins" ON public.plugins
    FOR SELECT USING (true);

-- Site plugins policies
CREATE POLICY "Users can manage plugins of own sites" ON public.site_plugins
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.sites 
            WHERE sites.id = site_plugins.site_id 
            AND sites.user_id = auth.uid()
        )
    );

-- Backups policies
CREATE POLICY "Users can manage backups of own sites" ON public.backups
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.sites 
            WHERE sites.id = backups.site_id 
            AND sites.user_id = auth.uid()
        )
    );

-- Analytics policies
CREATE POLICY "Users can view analytics of own sites" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.sites 
            WHERE sites.id = analytics.site_id 
            AND sites.user_id = auth.uid()
        )
    );

-- Create functions and triggers

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.sites
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.pages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
