module.exports = function(grunt) {
	grunt.initConfig({

		// postcss: {
		//   options: {
		//     processors: [
		//       require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
		//       require('cssnano')() // minify the result
		//     ]
		//   },
		//   dist: {
		//     src: 'css/*.css'
		//   }
		// },

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded'
				},
				files: {
					'css/style.css': 'css/style.scss'
				}
			}
		},

		watch: {
			sass: {
				files: ['css/*.scss', 'css/partials/*.scss', 'css/vendor/*.scss'],
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
	// grunt.loadNpmTasks('grunt-postcss');

	grunt.registerTask('default', ['shell:server', 'watch']);
};