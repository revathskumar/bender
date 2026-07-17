# Define our project
project(
  'bender',
  version: '1.4.0-rc.0',
  license: ['GPL-3.0'],
  meson_version: '>= 1.0.1'
)

APP_ID = 'com.revathskumar.bender'

npm_bin = find_program('npm')

npm_build = custom_target('npm_build',
  build_by_default: true,
  build_always_stale: true,
  output: meson.project_name(),
  command: [
    npm_bin, 'install',
    '&&',
    npm_bin, 'run', 'build'
  ]
)

# Import the modules
gnome = import('gnome')

# Load instructions from subdirectories
subdir('data')
subdir('dist')

# Post installation tasks
# gnome.post_install(
#   gtk_update_icon_cache: true,
#   update_desktop_database: true
# )
