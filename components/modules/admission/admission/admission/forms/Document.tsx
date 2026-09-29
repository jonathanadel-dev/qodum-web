// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchDocumentsForAdmission} from '@/lib/actions/admission/globalMasters/document/document.actions';





// Main Function
const Document = ({selectedDocuments, setSelectedDocuments}:any) => {


    // Documents
    const [documents, setDocuments] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const documentsRes = await fetchDocumentsForAdmission();
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
                                <div className='flex flex-row items-ceter gap-[2px] min-w-[180px]'>
                                    <Checkbox
                                        className='rounded-[2px] text-hash-color'
                                        onClick={() => {
                                            if(selectedDocuments.map((d:any) => d.document_name).includes(n.document_name)){
                                                setSelectedDocuments(selectedDocuments.filter((d:any) => d.document_name !== n.document_name))
                                            }else{
                                                setSelectedDocuments([...selectedDocuments, {
                                                    document_type:n.document_type,
                                                    document_name:n.document_name
                                                }])
                                            }
                                        }}
                                        checked={selectedDocuments.map((d:any) => d.document_name).includes(n.document_name)}
                                    />
                                    <p className='text-xs text-hash-color pl-[2px]'>
                                        {n.document_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};





// Export
export default Document;