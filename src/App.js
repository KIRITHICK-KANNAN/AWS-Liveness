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
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import FaceLiveness from "./Components/FaceLiveness";
import ReferenceImage from "./Components/ReferenceImage";
import awsexports from "./aws-exports";
import "bootstrap/dist/css/bootstrap.min.css";

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
      {/* Custom Sticky Header */}
      <View
        as="nav"
        className="navbar navbar-expand-sm navbar-dark border-bottom bg-header fixed-top"
        style={{
          background: "#f8f9fa",
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.2)",
          padding: "0.8rem",
          zIndex: 1000,
        }}
      >
        <View className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
              alt="logo"
              className="site_logo img-fluid"
              style={{
                maxWidth: "100%",
                height: "auto",
                width: "10%",
              }}
            />
          </a>
        </View>
      </View>

      {/* Main Content */}
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="nowrap"
        padding="2rem"
        paddingTop="6rem" // sticky header spacing
        minHeight="80vh"
        backgroundColor="background.secondary"
      >
        <View
          as="div"
          maxHeight="600px"
          height="600px"
          width="740px"
          maxWidth="740px"
        >
          {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
            <ReferenceImage
              faceLivenessAnalysis={faceLivenessAnalysis}
              tryagain={tryagain}
            />
          ) : (
            <FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />
          )}
        </View>
      </Flex>

      {/* Optional Footer */}
      <View
        as="footer"
        backgroundColor="#f8f9fa"
        padding="1rem"
        textAlign="center"
        boxShadow="0 -2px 4px rgba(0, 0, 0, 0.1)"
      >
        <Text>
          &copy; {new Date().getFullYear()} Kirithick Tech. All rights reserved.
        </Text>
      </View>
    </ThemeProvider>
  );
}

export default App;
