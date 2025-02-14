import { useState } from "react";
// import { useDropzone } from 'react-dropzone'
import { HiArrowDownTray } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const MAX_FILE_SIZE_MB = 5;
    const ACCEPTED_FILE_TYPE = ['image/jpeg', 'image/png', 'application/pdf'];

    // const onDrop = (acceptedFiles) => {
    //     setError('');
    //     const validFiles = acceptedFiles.filter((file) => {
    //         if (!ACCEPTED_FILE_TYPE.includes(file.type)) {
    //             setError(`Invalid file type: ${file.name} ,only img and pdf are allowed`);
    //             return false;
    //         }
    //         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    //             setError(`file size too large ${file.name}, max size is ${MAX_FILE_SIZE_MB}MB.`);
    //             return false;
    //         }
    //         return true;
    //     });
    //     setFiles((prevFiles) => {
    //         const updatedFiles = [...prevFiles, ...validFiles];
    //         updateProgress(updatedFiles.length);
    //         return updatedFiles;
    //     });

    // };


    // cutom logic
    const handleFileInput = (e) => {
        setError('');
        const seletedFiles = Array.from(e.target.files);

        const validFiles = seletedFiles.filter((file) => {
            if (!ACCEPTED_FILE_TYPE.includes(file.type)) {
                setError(`Invalid file type: ${file.name} ,only img and pdf are allowed`);
                return false;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setError(`file size too large ${file.name}, max size is ${MAX_FILE_SIZE_MB}MB.`);
                return false;
            }
            return true;
        });
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...validFiles];
            updateProgress(updatedFiles.length);
            return updatedFiles;
        });
        e.target.value = ""; //add multiple input upload karyala     
    }

    //progress bar
    const updateProgress = (fileCount) => {
        const calculatedProgress = fileCount * 10;
        setUploadProgress(Math.min(calculatedProgress, 100));
    };


    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: ACCEPTED_FILE_TYPE,
    //     maxSize: MAX_FILE_SIZE_MB * 5000000,
    // });

    console.log("filename:", files)

    const removeFile = (index) => {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            updateProgress(updatedFiles.length); // Update progress based on the new file count
            return updatedFiles;
        });
    };


    return (
        <div>
            <h1>Upload Files</h1>
            <div className="drag-area"
            // {...getRootProps()} input  {...getInputProps()}

            ><HiArrowDownTray style={{ width: "80px", height: "40px" }} />
                <p>Drag and Drop file here,or Click to upload.</p>
                <input type="file" multiple onChange={handleFileInput} className="file-input" />
            </div>
            {error && <p className="error-massage">{error}</p>}
            <div className="file-preview">
                {files.map((file, index) => (

                    <div className="file-preview-item" key={index}>
                        {file.type.startsWith('image/') && (
                            <img src={URL.createObjectURL(file)} alt={file.name} />
                        )}
                        <div className="btn">
                            <p className="file-name">{file.name}</p>
                            {/* <button className="btn1" onClick={() => removeFiles(file.name)}><MdDelete /></button> */}
                            <MdDelete className="btn1" onClick={() => removeFile(index)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="progress-container">
                <label htmlFor="progressBar" className="progress-label">
                    Upload Progress:
                </label>
                <input
                    type="range"
                    id="progressBar"
                    value={uploadProgress}
                    readOnly
                    className="progress-bar"
                />
                <p className="progress-percentage">{uploadProgress}%</p>
            </div>

        </div>
    );
};

export default FileUpload;  