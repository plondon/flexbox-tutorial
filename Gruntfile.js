module.exports = function(grunt) {
	var ip = grunt.option('ip') || 'localhost';
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
				command: 'killall php; php -S' + ip + ':3000',
				options: {
					async: true
				}
			}
		},

		requirejs: {
		  compile: {
		    options: {
		      baseUrl: "js",
		      name: "lib/almond",
		      mainConfigFile: "js/main.js",
		      out: "js/build.main.js",
		      done: function(done, output) {
		        var duplicates = require('rjs-build-analysis').duplicates(output);

		        if (Object.keys(duplicates).length > 0) {
		          grunt.log.subhead('Duplicates found in requirejs build:');
		          for (var key in duplicates) {
		            grunt.log.error(duplicates[key] + ": " + key);
		          }
		          return done(new Error('r.js built duplicate modules, please check the excludes option.'));
		        } else {
		          grunt.log.success("No duplicates found!");
		        }

		        done();
		      }
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell-spawn');
	// grunt.loadNpmTasks('grunt-postcss');

	grunt.registerTask('default', ['shell:server', 'watch']);
	grunt.registerTask('build', ['requirejs']);
};