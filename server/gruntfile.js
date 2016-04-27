module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.initConfig({
    	apidoc: {
		  taptitans: {
		    src: "app_web/",
		    dest: "apidoc/"
		  }
		}
    });
}