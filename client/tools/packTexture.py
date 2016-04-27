#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import subprocess
import sys
import argparse
import shutil

if len(sys.argv) < 4 :
    print "Usage: " + sys.argv[0] + " $proj_dir $raw_texture_dir_relative $output_dir_relative [texture format] [opt]"
    print "      (default texture format 'pvr3ccz', default opt PVRTC4')"
    print "Example: ./packTexture.py ~/game res/RawTextures res/PackedTextures"
    sys.exit(-1)

TexturePacker = '/usr/local/bin/TexturePacker'

proj_dir = sys.argv[1]
raw_texture_dir = os.path.join(proj_dir, sys.argv[2])
output_dir = os.path.join(proj_dir, sys.argv[3])
output_dir_android = output_dir
output_format = sys.argv[4] if len(sys.argv) > 4 else "pvr3ccz"
output_opt = sys.argv[5] if len(sys.argv) > 5 else "PVRTC4"
output_ext = ".png" if output_format == "png" else ".pvr.ccz"
is_armature_mode = len(sys.argv) > 6 and sys.argv[6] == 'armature'

def is_images(name):
    return name.lower().endswith('png')

def mkdir_if_needed(dirr):
    if not os.path.isdir(dirr):
        os.makedirs(dirr)

def file_get_contents(filename):
    if os.path.exists(filename):
        fp = open(filename, "r")
        content = fp.read()
        fp.close()
        return content

def copyFiles(sourceDir,  targetDir): 
    for file in os.listdir(sourceDir): 
        sourceFile = os.path.join(sourceDir,  file) 
        targetFile = osgpath.join(targetDir,  file) 
        if os.path.isfile(sourceFile): 
            open(targetFile, "wb").write(open(sourceFile, "rb").read())

def run_tp(files, options, isSingle=False, isCompress=False):
    if not isSingle:
        opts = { # TexturePacker --help
            "verbose": "",
            "pack-mode": "Best",
            "format": "cocos2d",
            "algorithm": "MaxRects",
            "max-size": "2048",
            "opt": output_opt,
            "reduce-border-artifacts": "",
            "shape-padding": "2",
            "size-constraints": "AnySize",
            #"extrude": "2",
        }
    else:
        opts = {
            "verbose": "",
            "pack-mode": "Best",
            "format": "cocos2d",
            "allow-free-size": '',
            "algorithm": 'Basic',
            "reduce-border-artifacts": "",
            "no-trim": '',
            "padding": '0',
            "opt": output_opt,
            "shape-padding": '0',
            'border-padding': '0',
            "disable-rotation": '',
            "size-constraints": "AnySize"
        }

    if options["texture-format"] == "pvr3ccz":
        opts["premultiply-alpha"] = ""

    if isCompress:
        if isCompress == 'RGBA4444':
            opts["opt"] = 'RGBA4444'
            opts["dither-fs-alpha"] = ""
        elif options["texture-format"] == "pvr3ccz":
            opts["opt"] = "PVRTC4"
            opts.pop("premultiply-alpha", None)
            opts["size-constraints"] = "POT"
            opts["force-squared"] = ""

    for f in files:
        if not os.path.isfile(f):
            print 'ERROR: ', f, 'is not a file. Skipped'
            return
    files = [os.path.relpath(f, proj_dir) for f in files]
    opts.update(options)
    args = [TexturePacker]
    for key in sorted(opts):
        args.append('--' + key)
        value = opts[key]
        if value:
            args.append(value)
    process = subprocess.Popen(
        args + sorted(files) if files is not None else '',
        stderr = subprocess.STDOUT,
        cwd = proj_dir)
    result = process.wait()
    #print ' '.join(args + files)
    assert result == 0, 'TexturePacker failed ' + str(args+files)

def process():
    #parser = argparse.ArgumentParser(description='Process args')
    #parser.add_argument('-d', '--directory', help='directory to handle')
    #parser.add_argument('-t', '--target', help='target platform')
    #args = parser.parse_args()

    for group in os.listdir(raw_texture_dir):
        group_dir = os.path.join(raw_texture_dir, group)
        if not os.path.isdir(group_dir):
            continue
        
        if group == 'map_bg':
            for mapname in os.listdir(group_dir):
                options = {
                    'extrude': '2', 
                    'texture-format': output_format,
                    'sheet': os.path.join(output_dir, mapname + output_ext),
                    'data':  os.path.join(output_dir, mapname + '.plist')
                }
                mapdir = os.path.join(group_dir, mapname)
                files = [name for name in os.listdir(mapdir)]
                run_tp([os.path.join(mapdir, name) for name in files], options, isCompress=True)
            continue
        

        print 'start handling %s' % group_dir
        files = [name for name in os.listdir(group_dir)
                    if is_images(name)]
        #assert args.target in ['ios', 'android', None]
        #if args.target == 'android':

        options = {}
        if group == 'block':
            options.update({
                'disable-rotation': '',
                'disable-clean-transparency': '',
                'trim-mode': 'None',
                'extrude': '1'
            })
        
        options.update({
            'texture-format': output_format,
            'data': os.path.join(output_dir_android, group+'.plist'),
            'sheet': os.path.join(output_dir_android, group + output_ext),
        })
        #options.update({'opt':'RGBA8888'})
        #else:
        #    options = {
        #        'data': os.path.join(output_dir, group+'.plist'),
        #        'sheet': os.path.join(output_dir, group+'.pvr.ccz'),
        #    }
        #    options.update({'opt':'RGBA8888'})
        #    options.update({'size-constraints':'NPOT'})

        #if group in ['GENERAL_1', 'GENERAL_2', 'GENERAL_3']:
        #    options.update({'disable-rotation': ''})
        if group == "scale9":
            options.update({'disable-rotation': ''})
            options.update({'disable-clean-transparency': ''})

        isCompress = group in ["animation", "dialog", "bgs", "map_animation", "home_parallax", "map_bg"]
        isCompress = 'RGBA4444' if group in ['fail'] else isCompress
        run_tp([os.path.join(group_dir, name) for name in files], options, isCompress=isCompress)

def process_armatures():
    ccs_compress_list = [];
    compress_whitelist = [
        "game_end/finish", "game_end/mission_pass", "pet/get_pet", "game_ui/vs", 
        "pvp/win_light", "pvp/thunder", "game/boss_enter/char"
    ]
    pvrtc_compress = ["home/challenge_unlock"]
    src_dir = raw_texture_dir
    dst_dir = output_dir
    for root, dirs, files in os.walk(src_dir):
        for f in files:
            src_file = os.path.join(root, f);
            dst_dir1 = os.path.join(dst_dir, os.path.relpath(root, src_dir))
            dst_file = os.path.join(dst_dir1, f)
            mkdir_if_needed(dst_dir1)
            rel_path = os.path.relpath(root, src_dir)
            isCompress = False if rel_path in compress_whitelist else 'RGBA4444'
            isCompress = True if rel_path in pvrtc_compress else isCompress
            if f == 'texture.xml':      # dragonbones骨骼动画纹理
                xml = file_get_contents(src_file).replace('texture.png', 'texture.pvr.ccz')
                open(dst_file, "wb").write(xml)
                tp_opts = {
                    'texture-format': 'pvr3ccz',
                    'sheet': os.path.join(dst_dir1, 'texture.pvr.ccz'),
                    'data': os.path.join(dst_dir1, 'dummy.plist')
                }
                run_tp([os.path.join(root, 'texture.png')], tp_opts, isSingle=True, isCompress=isCompress)
            elif f.endswith("0.plist"): # cocostudio骨骼动画纹理
                png = f.replace(".plist", '.png')
                plist = file_get_contents(src_file).replace(png, f.replace('.plist', '.pvr.ccz'));
                open(dst_file, "wb").write(plist)
                tp_opts = {
                    'texture-format': 'pvr3ccz',
                    'sheet': os.path.join(dst_dir1, f.replace(".plist", ".pvr.ccz")),
                    'data': os.path.join(dst_dir1, f.replace('0.plist', '_dummy.plist'))
                }
                run_tp([os.path.join(root, png)], tp_opts, isSingle=True, isCompress=isCompress)
                pass
            elif f.endswith(".png"):    # png文件不用拷贝
                pass    
            else:                       # 其他文件直接拷贝 skeleton.xml
                shutil.copyfile(os.path.join(root, f), dst_file)
                pass

if __name__ == '__main__':
    mkdir_if_needed(output_dir)
    if is_armature_mode:
        process_armatures()
    else:
        process()

