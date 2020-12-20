import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

class FileIcons extends Component {
    render() {
        let icons = {
            aac: '../fileicon/aac.png',
            ai: '../fileicon/ai.png',
            aiff: '../fileicon/aiff.png',
            avi: '../fileicon/avi.png',
            bmp: '../fileicon/bmp.png',
            c: '../fileicon/c.png',
            cpp: '../fileicon/cpp.png',
            css: '../fileicon/css.png',
            csv: '../fileicon/csv.png',
            dat: '../fileicon/dat.png',
            dmg: '../fileicon/dmg.png',
            doc: '../fileicon/doc.png',
            dotx: '../fileicon/dotx.png',
            dwg: '../fileicon/dwg.png',
            dxf: '../fileicon/dxf.png',
            eps: '../fileicon/eps.png',
            exe: '../fileicon/exe.png',
            flv: '../fileicon/flv.png',
            gif: '../fileicon/gif.png',
            h: '../fileicon/h.png',
            hpp: '../fileicon/hpp.png',
            html: '../fileicon/html.png',
            ics: '../fileicon/ics.png',
            iso: '../fileicon/iso.png',
            java: '../fileicon/java.png',
            jpg: '../fileicon/jpg.png',
            js: '../fileicon/js.png',
            key: '../fileicon/key.png',
            less: '../fileicon/less.png',
            mid: '../fileicon/mid.png',
            mp3: '../fileicon/mp3.png',
            mp4: '../fileicon/mp4.png',
            mpg: '../fileicon/mpg.png',
            odf: '../fileicon/odf.png',
            ods: '../fileicon/ods.png',
            odt: '../fileicon/odt.png',
            otp: '../fileicon/otp.png',
            ots: '../fileicon/ots.png',
            ott: '../fileicon/ott.png',
            pdf: '../fileicon/pdf.png',
            php: '../fileicon/php.png',
            png: '../fileicon/png.png',
            ppt: '../fileicon/ppt.png',
            psd: '../fileicon/psd.png',
            py: '../fileicon/py.png',
            qt: '../fileicon/qt.png',
            rar: '../fileicon/rar.png',
            rb: '../fileicon/rb.png',
            rtf: '../fileicon/rtf.png',
            sass: '../fileicon/sass.png',
            scss: '../fileicon/scss.png',
            sql: '../fileicon/sql.png',
            tga: '../fileicon/tga.png',
            tgz: '../fileicon/tgz.png',
            tiff: '../fileicon/tiff.png',
            txt: '../fileicon/txt.png',
            wav: '../fileicon/wav.png',
            xls: '../fileicon/xls.png',
            xlsx: '../fileicon/xlsx.png',
            xml: '../fileicon/xml.png',
            yml: '../fileicon/yml.png',
            zip: '../fileicon/zip.png',
            _blank: '../fileicon/_blank.png',
            _page: '../fileicon/_page.png'
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
            <Image source={{uri}} style={[styles.wrapper, this.props.style]}/>
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