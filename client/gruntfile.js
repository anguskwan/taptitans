module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'egret build  -sourcemap'
        },
        quick: {
            command: 'egret quickbuild  -sourcemap'
        },
        rebuild:{
            command: 'egret build -e clean'
        },
        publish:{
            command: 'egret publish --version 1.0'
        },
        reveal:{
            command: 'open ./'
        },
        native:{
            command: 'egret build --runtime native -e'
        },
        excel2json: {
            command: "bash " + __dirname + "/tools/encrypt.sh"
        },
        runtime:{
            command: 'egret publish -compile --runtime native'
        },
        mktaptitansdir: {
            command: "mkdir release/html5/1.0/taptitans"
        },
        move2taptitans : {
            command: 'mv release/html5/1.0/launcher release/html5/1.0/taptitans &' +
                'mv release/html5/1.0/resource release/html5/1.0/taptitans '
        }
    },
    watch: {
      //监听文件变化，分别有src下非skins目录的ts文件，skins的exml文件，以及launcher目录中的两个html及里面所有js
      files: ['src/**/*.ts','!src/skins*/**','src/*.js','src/**/*.exml'],
      tasks: ['shell:target']
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch')
  // 默认被执行的任务列表。
    grunt.registerTask('default', ['shell:target']);//编译
    grunt.registerTask('quick', ['shell:quick']);//编译
    grunt.registerTask('rebuild', ['shell:rebuild']);//重建
    grunt.registerTask('publish', ['shell:publish', 'shell:mktaptitansdir', 'shell:move2taptitans']);//发布并打开release目录，打开目录仅Mac
    grunt.registerTask('open', ['shell:reveal']);//打开当前目录，仅Mac
    grunt.registerTask('runtime', ['shell:runtime']);//runtime
    grunt.registerTask('native', ['shell:native']);//runtime
    grunt.registerTask('e2j', ['shell:excel2json']);//runtime

};
//egret create_app G1_iOS -f G1 -t egret-ios-support
