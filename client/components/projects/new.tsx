// import { Formik } from 'formik';
import Menu from '../menu/Menu';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Player } from '@livepeer/react';
import { useCreateAsset } from '@livepeer/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
    name: Yup.string().trim().required('name is required'),
    version: Yup.string().trim().required('version is required'),
    description: Yup.string().trim().required('description is required'),
    videoLink: Yup.string().trim().required('video link is required'),
    investmentGoals: Yup.number().required('goal is required'),
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
              New Project !
            </h2>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-between w-6/12">
                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Project Name</p>
                    <Field name="name" type="text" className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl my-2" />
                    <ErrorMessage name="name" />
                  </div>
                </div>

                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Version</p>
                    <Field
                      name="version"
                      type="text"
                      className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl my-2"
                    />
                    <ErrorMessage name="version" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                  <p>Description</p>
                  <Field
                    name="description"
                    type="text"
                    className="h-6 p-6 bg-gray-600 hover:bg-gray-500 rounded-xl my-2"
                  />
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="flex justify-between w-6/12">
                <div className="flex flex-col w-full">
                  <p>Video Link </p>
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
                    <p>Investment Progress</p>
                    <Field
                      name="investmentProgress"
                      type="number"
                      className="rounded-xl h-6 p-6 bg-gray-600 hover:bg-gray-500 my-2"
                    />
                    <ErrorMessage name="investmentProgress" />
                  </div>
                </div>

                <div className="flex justify-between w-5/12">
                  <div className="flex flex-col w-full">
                    <p>Investment Goal </p>
                    <Field
                      name="investmentGoals"
                      type="number"
                      className="h-6 rounded-xl  p-6 bg-gray-600 hover:bg-gray-500 my-2"
                    />
                    <ErrorMessage name="investmentGoals" />
                  </div>
                </div>
              </div>

              <button type="submit" onClick={() => {createAsset?.();}}>Submit</button>
            </div>
          </div>
        </Form>
      </Formik>
      {/* Livepeer player code */}
      {/* <div className="ml-[25%] w-[50%] h-[50%]">
        <Player
          title="Waterfalls"
          playbackId="92e24klizjz8bsqg"
          showPipButton
          showTitle={false}
          aspectRatio="16to9"
          controls={{
            autohide: 3000,
          }}
        />
      </div> */}
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
