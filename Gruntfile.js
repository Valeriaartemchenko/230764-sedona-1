"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/style.css": "sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]}),
            require("css-mqpacker")({
              sort:true})
          ]
        },
        src: "css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png.jpg,gif}"]
        }]
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display:none"
        }
      },
      symbols: {
        files: {
          "img/symbols.svg":["img/icons/*.svg"]
        }
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src : ["img/icons/*.svg"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "post`css"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("build", [
    "sass",
    "postcss",
    "csso",
    "symbols",
    "imagemin"
    ]);
};
