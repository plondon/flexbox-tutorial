module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package'),

		shell: {
			server: {
				command: 'killall php; php -S localhost:3000',
				options: {
					async: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.registerTask('default', ['shell:server']);
};