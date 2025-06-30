-- Insert sample plugins
INSERT INTO public.plugins (name, slug, description, version, author, category, price) VALUES
('Elementor Pro', 'elementor-pro', 'Editor visual avançado com drag & drop para criar páginas profissionais', '3.18.0', 'Elementor Team', 'Editor', 0),
('WooCommerce', 'woocommerce', 'Transforme seu site em uma loja online completa', '8.2.1', 'Automattic', 'E-commerce', 0),
('Yoast SEO', 'yoast-seo', 'Otimize seu site para mecanismos de busca', '21.5', 'Team Yoast', 'SEO', 0),
('Duplicator Pro', 'duplicator-pro', 'Backup, migração e clonagem de sites', '4.5.12', 'Snap Creek', 'Backup', 59),
('WP Rocket', 'wp-rocket', 'Plugin de cache e otimização de performance', '3.15.4', 'WP Media', 'Performance', 49),
('Contact Form 7', 'contact-form-7', 'Gerenciador de formulários de contato simples e flexível', '5.8.4', 'Takayuki Miyoshi', 'Forms', 0),
('Akismet', 'akismet', 'Proteção anti-spam para comentários e formulários', '5.3.1', 'Automattic', 'Security', 0),
('UpdraftPlus', 'updraftplus', 'Backup e restauração de sites WordPress', '1.23.11', 'UpdraftPlus.Com', 'Backup', 0),
('Mailchimp for WordPress', 'mailchimp-wp', 'Integração com Mailchimp para newsletters', '4.9.10', 'ibericode', 'Marketing', 0),
('WP Super Cache', 'wp-super-cache', 'Plugin de cache para acelerar seu site', '1.12.0', 'Automattic', 'Performance', 0)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample site templates data (this would be used by the frontend)
-- Note: This is just for reference, the actual templates would be stored as JSON or in a separate system

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sites_user_id ON public.sites(user_id);
CREATE INDEX IF NOT EXISTS idx_sites_domain ON public.sites(domain);
CREATE INDEX IF NOT EXISTS idx_sites_status ON public.sites(status);
CREATE INDEX IF NOT EXISTS idx_pages_site_id ON public.pages(site_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);
CREATE INDEX IF NOT EXISTS idx_site_plugins_site_id ON public.site_plugins(site_id);
CREATE INDEX IF NOT EXISTS idx_site_plugins_plugin_id ON public.site_plugins(plugin_id);
CREATE INDEX IF NOT EXISTS idx_backups_site_id ON public.backups(site_id);
CREATE INDEX IF NOT EXISTS idx_backups_created_at ON public.backups(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_site_id ON public.analytics(site_id);
CREATE INDEX IF NOT EXISTS idx_analytics_visited_at ON public.analytics(visited_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON public.analytics(page_path);
