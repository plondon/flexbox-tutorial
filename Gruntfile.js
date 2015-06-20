module.exports = function(grunt) {
	grunt.initConfig({

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceMap: true
				},
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},

		watch: {
			sass: {
				files: ['css/*.scss', 'css/partials/*.scss'],
				tasks: ['sass:dev']
			}
		},

		shell: {
			server: {
				command: 'killall php; php -S localhost:3000',
				options: {
					async: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.registerTask('default', ['shell:server', 'watch']);
};