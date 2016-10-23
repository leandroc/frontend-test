module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // paths
    paths: {
      app: 'app',
      assets: 'app/assets'
    },

    // watch task
    watch: {
      sass: {
        files: '<%= paths.assets %>/scss/**/*.{scss,sass}',
        tasks: ['sass:dist']
      }
    },

    // sass compile task
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          '<%= paths.assets %>/css/style.css': '<%= paths.assets %>/scss/style.scss'
        }
      }
    },

    // browserSync task
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            '<%= paths.assets %>/css/*.css',
            '<%= paths.app %>/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './app'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // dev task
  grunt.registerTask('default', ['browserSync', 'sass:dist', 'watch']);

  // build task
  grunt.registerTask('build', ['sass:dist']);
}