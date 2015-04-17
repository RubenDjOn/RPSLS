module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    browserify: {
      main: {
        options: {
          debug: true
        },
        files: {
          'public/scripts/bundle.js': 'public/scripts/main.js'
        }
      },
    },
    watch: {
      browserify: {
        files: ['public/scripts/**/*.js'],
        tasks: ['default']
      },
      options: {
        nospawn: true
      }
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',          
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          require: 'support/compiler.js'
        },
        src: ['tests/spec/*.js']
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');  
  grunt.loadNpmTasks('grunt-mocha-test');
 
  grunt.registerTask('default', ['browserify', 'watch', 'mochaTest']);

};