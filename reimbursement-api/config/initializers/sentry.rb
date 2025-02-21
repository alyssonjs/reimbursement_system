Sentry.init do |config|
  if Rails.env.production?
    config.dsn = ENV.fetch("SENTRY_DSN")
    config.breadcrumbs_logger = [:active_support_logger]
    config.traces_sample_rate = 0.5
  end
end
