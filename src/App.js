// import './App.css';
// import React from "react";
// import { Amplify } from 'aws-amplify';
// import { ThemeProvider } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import FaceLiveness from './Components/FaceLiveness';
// import ReferenceImage from './Components/ReferenceImage';
// import {
//   View,
//   Flex,
// } from '@aws-amplify/ui-react';

// import awsexports from './aws-exports';

// Amplify.configure(awsexports);

// function App() {

//   const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null)

//   const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
//     if (faceLivenessAnalysis !== null) {
//       setFaceLivenessAnalysis(faceLivenessAnalysis)
//     }
//   }

//   const tryagain = () =>{
//     setFaceLivenessAnalysis(null)
//   }

//   return (
//     <ThemeProvider>
//       <Flex
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//         alignContent="flex-start"
//         wrap="nowrap"
//         gap="1rem"
//       >
//         <View
//           as="div"
//           maxHeight="600px"
//           height="600px"
//           width="740px"
//           maxWidth="740px"
//         >
//           {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
//             <ReferenceImage faceLivenessAnalysis={faceLivenessAnalysis} tryagain={tryagain}></ReferenceImage>
//           ) :
//             (<FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />)}

//         </View>
//       </Flex>
//     </ThemeProvider>

//   );
// }

// export default App;

import "./App.css";
import React from "react";
import { Amplify } from "aws-amplify";
import {
  ThemeProvider,
  View,
  Flex,
  Heading,
  Text,
  Image,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import FaceLiveness from "./Components/FaceLiveness";
import ReferenceImage from "./Components/ReferenceImage";
import awsexports from "./aws-exports";

Amplify.configure(awsexports);

function App() {
  const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null);

  const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
    if (faceLivenessAnalysis !== null) {
      setFaceLivenessAnalysis(faceLivenessAnalysis);
    }
  };

  const tryagain = () => {
    setFaceLivenessAnalysis(null);
  };

  return (
    <ThemeProvider>
      {/* Custom Header */}
      <View
        as="nav"
        padding="1rem"
        backgroundColor="#f8f9fa"
        boxShadow="0 0 1rem rgba(0, 0, 0, 0.2)"
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Image
          src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
          alt="logo"
          width="100px"
          height="auto"
        />
      </View>

      {/* Main Content */}
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop="6rem" // for sticky header space
        padding="2rem"
        minHeight="80vh"
        backgroundColor="background.secondary"
      >
        <View maxHeight="600px" height="600px" width="740px" maxWidth="740px">
          {faceLivenessAnalysis?.Confidence ? (
            <ReferenceImage
              faceLivenessAnalysis={faceLivenessAnalysis}
              tryagain={tryagain}
            />
          ) : (
            <FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />
          )}
        </View>
      </Flex>

      {/* Footer */}
      <View
        as="footer"
        backgroundColor="#f8f9fa"
        padding="1rem"
        textAlign="center"
        boxShadow="0 -2px 4px rgba(0, 0, 0, 0.1)"
      >
        <Text>
          &copy; {new getFullYear()} All rights reserved.
        </Text>
      </View>
    </ThemeProvider>
  );
}

export default App;
