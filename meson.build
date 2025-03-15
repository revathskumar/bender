# Define our project
project(
	'bender',
	version: '1.3.0',
	license: ['MIT'],
	meson_version: '>= 1.0.1'
)

APP_ID = 'com.revathskumar.bender'

# Import the modules
gnome = import('gnome')

# Load instructions from subdirectories
subdir('data')
subdir('dist')

# Post installation tasks
# gnome.post_install(
# 	gtk_update_icon_cache: true,
# 	update_desktop_database: true
# )
