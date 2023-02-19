import React, { useEffect, useRef } from 'react';
import { Player } from '@livepeer/react';
import { CONTRACT_ADDRESS, abi } from '../../constants';
import Web3Modal from 'web3modal';
import { providers, Contract } from 'ethers';

const Project = () => {
  
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    console.log(web3ModalRef);
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const network = await web3Provider.getNetwork();
    if (network.chainId !== 5) {
      window.alert('Change your network to goerli testnet');
      throw new Error('Change to goerli testnet');
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getProjectInfo = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
      const projectInfo = await contract.getProjectInfo();
      console.log(projectInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: 'goerli',
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, []);

  return (
    <div>
      <h1>Project</h1>
      <div className="ml-[25%] w-[50%] h-[50%]">
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
      </div>
    </div>
  );
};

export default Project;
