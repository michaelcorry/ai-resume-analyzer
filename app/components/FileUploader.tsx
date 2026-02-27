import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void,
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);

        onFileSelect?.(file);
    }, [onFileSelect])

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: {'application/pdf': ['.pdf']},
        maxFiles: maxFileSize,
    })

    const handleRemoveFile = () => {
        setSelectedFile(null);
        onFileSelect?.(null);
    }

    return (
        <div className="w-full panel p-4">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">

                    {selectedFile ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10"/>
                            <div className="flex items-center spcae-x-3">
                                <div>
                                    <p className="text-sm  font-medium truncate max-w-xs">{selectedFile.name}</p>
                                    <p className=" text-sm">{formatSize(selectedFile.size)}</p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer hover:opacity-80"
                                    onClick={(e) => {
                                        handleRemoveFile()
                                    }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20"/>
                            </div>
                            <p className="text-lg ">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-lg ">PDF ({formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;