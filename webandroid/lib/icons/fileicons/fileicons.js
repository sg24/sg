import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import aac from "./fileicon/aac.png";
import ai from "./fileicon/ai.png";
import aiff from "./fileicon/aiff.png";
import avi from "./fileicon/avi.png";
import bmp from "./fileicon/bmp.png";
import c from "./fileicon/c.png";
import cpp from "./fileicon/cpp.png";
import css from "./fileicon/css.png";
import csv from "./fileicon/csv.png";
import dat from "./fileicon/dat.png";
import dmg from "./fileicon/dmg.png";
import doc from "./fileicon/doc.png";
import dotx from "./fileicon/dotx.png";
import dwg from "./fileicon/dwg.png";
import dxf from "./fileicon/dxf.png";
import eps from "./fileicon/eps.png";
import exe from "./fileicon/exe.png";
import flv from "./fileicon/flv.png";
import gif from "./fileicon/gif.png";
import h from "./fileicon/h.png";
import hpp from "./fileicon/hpp.png";
import html from "./fileicon/html.png";
import ics from "./fileicon/ics.png";
import iso from "./fileicon/iso.png";
import java from "./fileicon/java.png";
import jpg from "./fileicon/jpg.png";
import js from "./fileicon/js.png";
import key from "./fileicon/key.png";
import less from "./fileicon/less.png";
import mid from "./fileicon/mid.png";
import mp3 from "./fileicon/mp3.png";
import mp4 from "./fileicon/mp4.png";
import mpg from "./fileicon/mpg.png";
import odf from "./fileicon/odf.png";
import ods from "./fileicon/ods.png";
import odt from "./fileicon/odt.png";
import otp from "./fileicon/otp.png";
import ots from "./fileicon/ots.png";
import ott from "./fileicon/ott.png";
import pdf from "./fileicon/pdf.png";
import php from "./fileicon/php.png";
import png from "./fileicon/png.png";
import ppt from "./fileicon/ppt.png";
import psd from "./fileicon/psd.png";
import py from "./fileicon/py.png";
import qt from "./fileicon/qt.png";
import rar from "./fileicon/rar.png";
import rb from "./fileicon/rb.png";
import rtf from "./fileicon/rtf.png";
import sass from "./fileicon/sass.png";
import scss from "./fileicon/scss.png";
import sql from "./fileicon/sql.png";
import tga from "./fileicon/tga.png";
import tgz from "./fileicon/tgz.png";
import tiff from "./fileicon/tiff.png";
import txt from "./fileicon/txt.png";
import wav from "./fileicon/wav.png";
import xls from "./fileicon/xls.png";
import xlsx from "./fileicon/xlsx.png";
import xml from "./fileicon/xml.png";
import yml from "./fileicon/yml.png";
import zip from "./fileicon/zip.png";
import _blank from "./fileicon/_blank.png";
import _page from "./fileicon/_page.png";

class FileIcons extends Component {
    render() {
        let icons = {
            aac,ai,aiff,avi,bmp,c,cpp,css,
            csv,dat,dmg,doc,dotx,dwg,dxf,eps,
            exe,flv,gif,h,hpp,html,ics,iso,
            java,jpg,js,key,less,mid,mp3,mp4,
            mpg,odf,ods,odt,otp,ots,ott,pdf,
            php,png,ppt,psd,py,qt,rar,rb,
            rtf,sass,scss,sql,tga,tgz,tiff,txt,
            wav,xls,xlsx,xml,yml,zip,_blank,_page           
        }
        let uri = icons._blank;
        if (this.props.ext) {
            for (let ext in icons) {
                if (ext === this.props.ext) {
                    uri = icons[ext];
                }
            }
        }
        return (
            <View style={this.props.wrapper}>
                <Image source={uri} style={[styles.wrapper, this.props.style]}/>
            </View>
        )
    }
};

let styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default FileIcons