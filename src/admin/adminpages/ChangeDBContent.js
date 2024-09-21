import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, limit, startAt, endAt, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './changedbcontent.css';

const ChangeDBContent = () => {
    const navigate = useNavigate();

    const initialFormValues = {
        plantid: '',
        commonname: '',
        scientificname: '',
        familyname: '',
        description: '',
        uses: '',
        growthconditions: '',
        propagation: '',
        remedy: '',
        imgurl: '',
        medimgurl: '',
    };

    const [documentId, setDocumentId] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const searchResultRef = useRef(null);

    const handleReset = () => {
        setFormValues(initialFormValues);
        setSearchQuery('');
        setSearchResult(null);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `plants/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                console.log('uploading')
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setFormValues((prevValues) => ({
                    ...prevValues,
                    imgurl: downloadURL,
                }));
            }
        );
    };


    const handleMedImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `plants/med_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                console.log('uploading')
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setFormValues((prevValues) => ({
                    ...prevValues,
                    medimgurl: downloadURL,
                }));
            }
        );
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'dashsearchbar') {
            setSearchQuery(value);
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    const handleSearch = async () => {
        const plantsRef = collection(db, "plants");

        try {
            let result = null;

            const commonNameQuery = query(plantsRef, orderBy("commonname"), startAt(searchQuery), endAt(searchQuery + "\uf8ff"), limit(1));
            const commonnameSnapshot = await getDocs(commonNameQuery);

            if (!commonnameSnapshot.empty) {
                result = { id: commonnameSnapshot.docs[0].id, ...commonnameSnapshot.docs[0].data() };
            } else {
                const docRef = doc(db, "plants", searchQuery);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    result = { id: docSnapshot.id, ...docSnapshot.data() };
                }
            }

            if (result) {
                setSearchResult(result);
            } else {
                setSearchResult(null);
            }
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    const handleResultClick = (docData) => {
        setFormValues({
            plantid: docData.id || '',
            commonname: docData.commonname || '',
            scientificname: docData.scientificname || '',
            familyname: docData.familyname || '',
            description: docData.description || '',
            uses: docData.uses || '',
            growthconditions: docData.growthconditions || '',
            propagation: docData.propagation || '',
            remedy: docData.remedy || '',
            imgurl: docData.imgurl || '',
            medimgurl: docData.medimgurl || '',
        });
        setSearchQuery('');
        setSearchResult(null);
    };

    const handleCommitChanges = async () => {
        const plantRef = doc(db, 'plants', formValues.plantid);

        try {
            await updateDoc(plantRef, formValues);
            alert('Changes committed successfully!');
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const handlecommitClick = () => {
        if (formValues.plantid) {
            handleCommitChanges();
        } else {
            alert('Plant ID not found');
        }
    };

    const handleAddNew = async () => {
        const newPlantRef = doc(db, 'plants', documentId);

        try {

            const docSnap = await getDoc(newPlantRef);

            if (docSnap.exists()) {
                alert(`Document with ID "${documentId}" already exists. Please use a different Document ID.`);
                return;
            }

            await setDoc(newPlantRef, formValues);
            alert('New plant document added successfully!');
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    const handleaddnewClick = () => {
        if (!formValues.plantid) {
            handleAddNew();
        } else {
            alert('Plant ID already exists');
        }
    };

    const handledocDelete = async () => {
        if (!formValues.plantid) {
            alert('No Id present to Delete');
            return;
        }

        const docRef = doc(db, 'plants', formValues.plantid);

        try {
            // Delete the document from Firestore
            await deleteDoc(docRef);
            alert(`Document with ID ${formValues.plantid} deleted successfully!`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting document: ', error);
            alert('Failed to delete document. Please try again.');
        }
    };

    const handledocdeleteClick = () => {
        if (formValues.plantid) {
            handledocDelete();
        } else {
            alert('Plant ID not found');
        }
    };

    const handleadmindash = () => {
        navigate('/admin-dashboard');
    };

    const handlegardenclick = () => {
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
                setSearchResult(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchResult]);

    return (
        <div className='changedbmain'>
            <div className='topbardash'>
                <input
                    type='text'
                    className='dashsearchbar'
                    name='dashsearchbar'
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder='Enter Plant ID or Name'
                />
                <button className='dashsearchbutton' onClick={handleSearch}>Search</button>
            </div>
            {searchResult && (
                <div className='searchresult' ref={searchResultRef} >
                    <p><strong>Common Name:</strong> <u>{searchResult.commonname}</u></p>
                    <p><strong>Plant ID:</strong> <u>{searchResult.id}</u></p>
                    <button onClick={() => handleResultClick(searchResult)}>DISPLAY</button>
                </div>
            )}
            <div className='changedmunder'>
                <div className='innerboxinfo'>
                    <div className='imgbarchange'>
                        <div className='imagedisplay'>
                            <div className='tobechangedimages' onClick={() => document.getElementById('imageUploader').click()}>
                                {!formValues.imgurl && <p>select a plant</p>}
                                {formValues.imgurl && <img src={formValues.imgurl} alt='plant not loading' />}
                                <input type='file' id='imageUploader' accept='image/*' style={{ display: 'none' }} onChange={handleFileChange} />
                            </div>
                            <p>Plant Image</p>
                        </div>
                        <div className='imagedisplay'>
                            <div className='tobechangedimages' onClick={() => document.getElementById('medImageUploader').click()}>
                                {!formValues.medimgurl && <p>select a plant</p>}
                                {formValues.medimgurl && <img src={formValues.medimgurl} alt='plant not loading' />}
                                <input type='file' id='medImageUploader' accept='image/*' style={{ display: 'none' }} onChange={handleMedImageChange} />
                            </div>
                            <p>Remedy Image</p>
                        </div>
                        <div className='commitandnewbutton'>
                            <div className='butset1'>
                                <button className={!formValues.plantid ? 'nopointerforbutton' : 'nontruestatebutton'} title={formValues.plantid ? 'commit all the db changes' : 'cannot commit for non existant id'} onClick={handlecommitClick}>Commit Changes</button>
                                <button className={formValues.plantid ? 'nopointerforbutton' : 'nontruestatebutton'} title={!formValues.plantid ? 'add new plant' : 'plant id already exists'} onClick={handleaddnewClick}>Add New <br />Document ID</button>
                            </div>
                            <div className='butset2'>
                                <button className='resetbutton' title='reset all fields' onClick={handleReset}>Reset</button>
                                <button className={!formValues.plantid ? 'nopointerforbutton' : 'nontruestatebutton'} title={formValues.plantid ? 'delete plant document' : 'cannot delete an existant id'} onClick={handledocdeleteClick}>DELETE</button>
                            </div>
                        </div>
                    </div>
                    <div className='contentchange'>
                        <div className='infoareatitle'>
                            <pre><p>Plant ID : </p></pre>
                            {!formValues.plantid && <input type="text" id="documentId" placeholder='enter a new id' value={documentId} onChange={(e) => setDocumentId(e.target.value)} />}
                            {formValues.plantid && <p type='text' name='plantid' >{formValues.plantid}</p>}
                        </div>
                        <div className='infoarea singleinput'>
                            <p>Common Name</p>
                            <input
                                type='text'
                                name='commonname'
                                value={formValues.commonname}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Common Name'
                            />
                        </div>
                        <div className='infoarea singleinput'>
                            <p>Scientific Name</p>
                            <input
                                type='text'
                                name='scientificname'
                                value={formValues.scientificname}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Scientific Name'
                            />
                        </div>
                        <div className='infoarea singleinput'>
                            <p>Family Name</p>
                            <input
                                type='text'
                                name='familyname'
                                value={formValues.familyname}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Family Name'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Description</p>
                            <textarea
                                type="text"
                                name='description'
                                value={formValues.description}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Description'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Uses</p>
                            <textarea
                                type="text"
                                name='uses'
                                value={formValues.uses}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Uses'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Growth Conditions</p>
                            <textarea
                                type="text"
                                name='growthconditions'
                                value={formValues.growthconditions}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Growth Conditions'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Propagation</p>
                            <textarea
                                type="text"
                                name='propagation'
                                value={formValues.propagation}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Propagation'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Remedies</p>
                            <textarea
                                type="text"
                                name='remedy'
                                value={formValues.remedy}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Remedy'
                            />
                        </div>
                        <div className='infoarea multiinput'>
                            <p>Image URL</p>
                            <textarea
                                type="text"
                                name='imgurl'
                                value={formValues.imgurl}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Image Url'
                            />
                        </div>

                        <div className='infoarea multiinput'>
                            <p>Med Image URL</p>
                            <textarea
                                type="text"
                                name='medimgurl'
                                value={formValues.medimgurl}
                                onChange={handleInputChange}
                                placeholder='Enter The Plant Medical Image Url'
                            />
                        </div>

                    </div>
                </div>
            </div>
            <button onClick={handleadmindash} className='admindashbutton'>Admin Dashboard</button>
            <button onClick={handlegardenclick} className='gardendashbutton'>GARDEN</button>
        </div>
    );
};

export default ChangeDBContent;
