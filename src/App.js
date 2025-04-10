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

// import "./App.css";
// import React from "react";
// import { Amplify } from "aws-amplify";
// import {
//   ThemeProvider,
//   View,
//   Flex,
//   Heading,
//   Text,
//   Image,
// } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import FaceLiveness from "./Components/FaceLiveness";
// import ReferenceImage from "./Components/ReferenceImage";
// import awsexports from "./aws-exports";

// Amplify.configure(awsexports);

// function App() {
//   const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null);

//   const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
//     if (faceLivenessAnalysis !== null) {
//       setFaceLivenessAnalysis(faceLivenessAnalysis);
//     }
//   };

//   const tryagain = () => {
//     setFaceLivenessAnalysis(null);
//   };

//   return (
//     <ThemeProvider>
//       {/* Header */}
//       <View
//         as="header"
//         backgroundColor="#ffffff"
//         padding="1rem 2rem"
//         boxShadow="0 2px 4px rgba(0,0,0,0.1)"
//         position="fixed"
//         width="100%"
//         top="0"
//         zIndex="10"
//       >
//         <Image
//           src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
//           alt="logo"
//           width="180px"
//         />
//       </View>

//       {/* Main Content */}
//       <Flex
//         direction="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         paddingTop="6rem"
//         backgroundColor="#f4f4f4"
//       >
//         <View
//           backgroundColor="#ffffff"
//           padding="2rem"
//           borderRadius="1rem"
//           boxShadow="0 0 15px rgba(0, 0, 0, 0.1)"
//           width="100%"
//           maxWidth="750px"
//           minHeight="600px"
//         >
//           {faceLivenessAnalysis?.Confidence ? (
//             <ReferenceImage
//               faceLivenessAnalysis={faceLivenessAnalysis}
//               tryagain={tryagain}
//             />
//           ) : (
//             <FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />
//           )}
//         </View>
//       </Flex>

//       {/* Footer */}
//       <View
//         as="footer"
//         textAlign="center"
//         fontSize="0.875rem"
//         color="#888"
//         padding="1rem"
//         backgroundColor="#ffffff"
//         borderTop="3px solid #e0e0e0"
//       >
//         <Text>&copy; 2025 All rights reserved.</Text>
//       </View>
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
      {/* Header (no longer fixed) */}
      <View
        as="header"
        backgroundColor="#ffffff"
        padding="1rem 2rem"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
        width="100%"
      >
        <Image
          src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
          alt="logo"
          width="180px"
        />
      </View>

      {/* Main Content */}
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)"
        backgroundColor="#f4f4f4"
        padding="2rem 1rem"
      >
        <View
          backgroundColor="#ffffff"
          padding="1.5rem"
          borderRadius="1rem"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.08)"
          width="100%"
          maxWidth="600px"
          minHeight="300px"
        >
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
        textAlign="center"
        fontSize="0.875rem"
        color="#888"
        padding="1rem"
        backgroundColor="#ffffff"
        borderTop="3px solid #e0e0e0"
      >
        <Text>&copy; 2025 All rights reserved.</Text>
      </View>
    </ThemeProvider>
  );
}

export default App;
