// Imports
import {Download, Eye, X} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchStaffDocumentsForAdmission} from '@/lib/actions/payroll/globalMasters/document/staffDocument.actions';
import Link from 'next/link';





// Main function
const StaffDocumentDetails = ({selectedDocuments, setSelectedDocuments}:any) => {

    // Documents
    const [documents, setDocuments] = useState([]);


    // File ref
    const fileInputRef = useRef(null);


    // Handle file input
    const handleFileChange = (e:any, d:any) => {
        const selectedFile = e.target.files?.[0];
        console.log(selectedFile);

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        // Update documents state
        setSelectedDocuments((prevDocuments:any) =>
            prevDocuments.map((doc) =>
                doc.document_name === d.document_name
                    ? {
                        ...doc,
                        files: [
                            ...doc.files,
                            { file: selectedFile, file_name: selectedFile.name }
                        ]
                    }
                    : doc
            )
        );
    };


    // Remove handler
    const removeHandler = ({document_name, file_name}:any) => {
        setSelectedDocuments((prevDocuments) =>
            prevDocuments.map((doc) =>
                doc.document_name === document_name
                    ? {
                        ...doc,
                        files: doc.files.filter((file) => (file?.file_name || file) !== file_name)
                    }
                    : doc
            )
        );
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const documentsRes = await fetchStaffDocumentsForAdmission();
            setDocuments(documentsRes);
        };
        fetcher();
    }, []);

    return (
        <div className='w-full h-full m-auto flex flex-col overflow-y-scroll custom-sidebar-scrollbar'>
            <div className='flex flex-col gap-6 py-2'>

                {documents.length < 1 ? (
                        <p>No documents</p>
                    ) : // @ts-ignore
                        documents[0].document_type === undefined ? (
                        <LoadingIcon />
                    ) : documents.map((document:any) => (
                        <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[2px]'>
                            <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[2px]'>{document.document_type}</h2>
                            <div className='flex flex-row flex-wrap gap-4 p-2 pl-4'>
                                {document.document_names.length === 0 ? (
                                    <p className='text-xs text-hash-color pl-[2px]'>-</p>
                                ) : document.document_names.map((n:any) => (
                                    <div>

                                        {/* Document name */}
                                        <div className='flex flex-row items-ceter gap-[2px] min-w-[180px]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color'
                                                onClick={() => {
                                                    if(selectedDocuments?.map((d:any) => d?.document_name).includes(n?.document_name)){
                                                        setSelectedDocuments(selectedDocuments?.filter((d:any) => d?.document_name !== n?.document_name))
                                                    }else{
                                                        setSelectedDocuments([...selectedDocuments, {
                                                            document_type:n.document_type,
                                                            document_name:n.document_name,
                                                            files:[]
                                                        }])
                                                    }
                                                }}
                                                checked={selectedDocuments?.map((d:any) => d?.document_name).includes(n?.document_name)}
                                            />
                                            <p className='text-xs text-hash-color pl-[2px]'>
                                                {n.document_name}
                                            </p>
                                        </div>

                                        {/* Attachments */}
                                        <div className='mt-2'>


                                            {selectedDocuments.find((sd:any) => sd.document_name === n.document_name)?.files?.map((f:any) => (
                                                <div className='flex flex-row items-center gap-1 ml-6'> 
                                                    <p className='text-[11px] text-hash-color'>{f?.file_name || `Document ${selectedDocuments.find((sd:any) => sd.document_name === n.document_name)?.files.indexOf(f) + 1}`}</p>
                                                    <X
                                                        size={15}
                                                        color='#F00'
                                                        className='cursor-pointer hover:opacity-60'
                                                        onClick={() => removeHandler({document_name:n.document_name, file_name:f.file_name || f})}
                                                    />
                                                    {!f.file_name && (
                                                        <Link href={f} target='_blank'>
                                                            <Eye
                                                                size={15}
                                                                color='green'
                                                                className='cursor-pointer hover:opacity-60'
                                                            />
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                            {selectedDocuments.map((sd:any) => sd.document_name).includes(n.document_name) && (
                                                <div className='ml-6'>
                                                    <label
                                                        // @ts-ignore
                                                        for={n.document_name}
                                                        // onClick={handleSelectClick}
                                                        className='text-[11px] text-[#00F] cursor-pointer hover:opacity-70'
                                                    >
                                                        Select
                                                    </label>
                                                    <input
                                                        type='file'
                                                        accept='image/*, application/pdf'
                                                        name={n.document_name}
                                                        id={n.document_name}
                                                        ref={fileInputRef}
                                                        onChange={(e) => handleFileChange(e, n)}
                                                        style={{display:'none'}}
                                                        className='hidden'
                                                    />
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};





// Export
export default StaffDocumentDetails;