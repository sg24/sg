import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import Ionicons from 'ionicons';
import { size } from 'tailwind';
import { Video } from 'expo-av'
import {v4 as uuid } from 'uuid';
import FileIcon from 'file-icons';

import InnerScreen from '../InnerScreen/InnerScreen';
import DefaultHeader from '../Header/DefaultHeader';
import FormElement from '../FormElement/FormElement';
import { updateObject } from '../../../shared/utility';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

class FileExplorer extends Component {
    constructor(props) {
        super(props);
        let validator = {value: ''};
        let allValidator = {};
        let uploadFiles = [];
        if (this.props.uploadFile.length > 0) {
            let  i = 0
            for (let cnt of this.props.uploadFile) {
                ++i
                let id =  cnt.id ? cnt.id : uuid();
                cnt['id'] = id;
                cnt['description'] = cnt.description ? cnt.description :  ''
                validator.value = cnt.description ?  cnt.description : ''
                allValidator[id] = {...validator};
                uploadFiles.push({...cnt})
            }
        }
        this.state = {
            formElement: allValidator,
            uploadFiles,
            viewMode: Dimensions.get('window').width >= size.md ? 'landscape' : 'portrait',
        }
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= size.md ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    inputChangedHandler = (value, inputType) => {
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value
        });
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})
        let uploadFiles = [...this.state.uploadFiles];
        let filterUploadedFiles = uploadFiles.filter(cnt => cnt.id === inputType)[0];
        let updateIndex = uploadFiles.findIndex(cnt => cnt.id === inputType);
        if (filterUploadedFiles) {
            filterUploadedFiles.description = value;
        }
        uploadFiles[updateIndex] = {...filterUploadedFiles}
        this.setState({formElement: updateFormElement, uploadFiles})
    }


    removeFileHandler = (id) => {
        let uploadFiles = [...this.state.uploadFiles];
        let updateUploaded = uploadFiles.filter(files => files.id !== id);
        this.setState({uploadFiles: updateUploaded})
    }

    render() {
        return (
            <InnerScreen
                onRequestClose={this.props.closePreview.bind(this, this.state.uploadFiles)}
                animationType="slide"
                onBackdropPress={this.props.closePreview.bind(this, this.state.uploadFiles)}>
                <DefaultHeader
                    onPress={(this.props.closePreview.bind(this, this.state.uploadFiles))}
                    title="Upload Preview"
                    rightSideContent={this.props.rightSideContent} />
                <View style={styles.wrapper}>
                    <ScrollView showsVerticalScrollIndicator={Platform.OS === 'web' && this.state.viewMode === 'landscape'} contentContainerStyle={this.state.uploadFiles.length > 0 ? null: styles.errorWrapper}>
                        { this.state.uploadFiles.length < 1 ? <Text style={styles.error}>Upload  file to  preview</Text> : null}
                        { this.state.uploadFiles.map((file, index) => (
                            <View key={index} style={styles.preview}>
                                <View style={[styles.removeWrapper, styles.remove]}>
                                    <TouchableNativeFeedback style={styles.remove} onPress={this.removeFileHandler.bind(this, file.id)}>
                                        <Ionicons name="trash-bin-outline" size={20} color="#ff1600"/>
                                    </TouchableNativeFeedback>
                                </View>
                                <View style={styles.imageWrapper}>
                                    { file.type && file.type.split('/')[0] === 'image' ?
                                    <>
                                        <Image source={{uri: file.uri}} style={styles.image} />
                                        <Text style={[styles.fileName, styles.imageText]}>{file.name}</Text>
                                    </> :
                                    file.type && (file.type.split('/')[0] === 'video' || file.type.split('/')[0] === 'audio' )? 
                                        <>
                                            <Video
                                                source={{ uri: file.uri }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="contain"
                                                useNativeControls
                                                style={styles.containerWrapper}
                                                />
                                            <Text style={styles.fileName}>{file.name}</Text>
                                        </> : 
                                        <View style={styles.containerWrapper}>
                                            <FileIcon ext={file.name ? file.name.split('.').pop()  : ''} wrapper={styles.fileIconWrapper}/>
                                            <Text style={styles.fileName}>{file.name}</Text>
                                        </View>
                                        }
                                </View>
                              {this.props.disableDescription ? null :
                                <FormElement
                                    onChangeText={(val) => this.inputChangedHandler(val, file.id)}
                                    autoCorrect
                                    labelTitle="Description"
                                    multiline
                                    value={this.state.formElement[file.id].value}
                                    formWrapperStyle={styles.formWrapperStyle}
                                    style={styles.formElementInput}
                                    labelStyle={styles.labelStyle}/>
                            }
                          </View>
                        ))}
                   </ScrollView>
                </View>
            </InnerScreen>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10
    },
    preview: {
        marginBottom: 20,
        position: 'relative'
    },
    imageWrapper: {
        width: '100%',
        height: 200,
        padding: 10,
        backgroundColor: '#e9ebf2'
    },
    image: {
        flex: 1,
        resizeMode: 'center'
    },
    imageText: {
        paddingVertical: 5,
        marginTop: 0
    },
    removeWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        right: -5,
        zIndex: 2,
        top: -2
    },
    remove: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    containerWrapper: {
        flex: 1,
        position: 'relative'
    },
    fileIconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    fileName: {
        marginTop: 4,
        width: '100%',
        textAlign: 'center',
        fontSize: 16
    },
    formWrapperStyle: {
        borderWidth: 0,
        backgroundColor: '#dcdbdc',
    },
    labelStyle: {
        marginTop: 10
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: '#fff',
        paddingVertical: 10
    },
    errorWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    error: {  
        fontSize: 18,
        color: '#ff1600'
    }
})

export default FileExplorer;