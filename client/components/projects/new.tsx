// import { Formik } from 'formik';
import Menu from '../menu/Menu';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Player } from '@livepeer/react';
import { useCreateAsset } from '@livepeer/react';
import { useCallback, useState } from 'react';
import { time } from 'console';

interface PROJECT_INPUTS {
  address: string;
  name: string;
  version: string;
  description: string;
  videoLink: string;
  investmentGoals: number;
  investmentProgress: number;
}

const New = () => {
  const initialValues: PROJECT_INPUTS = {
    address: '',
    name: '',
    version: '',
    description: '',
    videoLink: '',
    investmentGoals: 0,
    investmentProgress: 0,
  };

  const submitSchema = Yup.object().shape({
    address: Yup.string().required('address is required!'),
    name: Yup.string().trim().required('Name is required'),
    version: Yup.string().trim().required('Version is required'),
    description: Yup.string().trim().required('Description is required'),
    videoLink: Yup.string().trim().required('Video link is required'),
    investmentGoals: Yup.number().required('Goal is required'),
    investmentProgress: Yup.number().required('progress is required'),
  });

  const onSubmit = async (values: PROJECT_INPUTS, { resetForm }: FormikHelpers<PROJECT_INPUTS>) => {
    try {
      console.log(values);
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const playbackId = 'bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy';

  const [video, setVideo] = useState<File | undefined>(undefined);
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null,
  );

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={submitSchema} onSubmit={onSubmit}>
        <Form className="flex justify-center items-center flex-col text-white">
          <div className="w-10/12 flex flex-col">
            <h2 className="text-medium-turquoise bg-indigo-dye text-3xl rounded-xl font-semibold py-10">
              Upload your Project
            </h2>
            <div className="flex flex-col justify-center items-center">
            
            <div className="flex justify-between w-6/12 mb-1">
                <div className="flex flex-col w-full">
                  <span>Name of the project<span className='text-red-600'>*</span></span>
                  <Field
                    name="name"
                    type="text"
                    className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl mt-2"
                  />
                  <div className='text-gray-400 text-sm ml-2'> <span><ErrorMessage name="name"/></span></div>
                 
                </div>
            </div>

              <div className="flex justify-between w-6/12 mb-2">
                <div className="flex flex-col w-full">
                <span>Description<span className='text-red-600'>*</span></span>
                  <Field
                    name="description"
                    type="text"
                    className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl mt-2"
                  />
                  <div className='text-gray-400 text-sm ml-2'><ErrorMessage name="description"/></div>
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                <span>Upload Video<span className='text-red-600'>*</span></span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple={false}
                    className="h-12 px-2 py-3 bg-gray-600 hover:bg-gray-500 rounded-xl my-2"
                    onChange={e => {
                      setVideo(e.target.files?.[0]);
                      
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                  <span>Goal<span className='text-red-600'>*</span></span>
                    <Field
                      name="investmentGoals"
                      type="number"
                      className="h-6 rounded-xl  p-6 bg-gray-600 hover:bg-gray-500 mt-2"
                    />
                    <div className='text-gray-400 text-sm ml-2'> <span><ErrorMessage name="investmentGoals"/></span></div>
                  </div>
                </div>
                <div className="flex justify-between ml-4 w-5/12 mb-4">
                  <div className="flex flex-col w-full">
                  <span>Project Version<span className='text-red-600'>*</span></span>
                    <Field
                      name="version"
                      type="text"
                      className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl mt-2"
                    />
                    <div className='text-gray-400 text-sm ml-2'> <span><ErrorMessage name="version"/></span></div>
                  </div>
                </div>
              </div>

              <button type="submit" className="bg-[#3F51B5] p-3 rounded-md w-36 hover:opacity-60" onClick={() => {createAsset?.();}}>Submit</button>
            </div>
          </div>
        </Form>
      </Formik>
      {assets?.map(asset => (
        <div key={asset.id}>
          <div>
            <div>Asset Name: {asset?.name}</div>
            <div>Playback URL: {asset?.playbackUrl}</div>
            <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
          </div>
        </div>
      ))}

      {error && <div>{error.message}</div>}
    </>
  );
};

export default New;
