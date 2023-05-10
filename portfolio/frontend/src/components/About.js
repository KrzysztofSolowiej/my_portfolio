import React from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const CardWrapper = styled.div`
// width: 400;
// height: 400;
// perspective: 10000;
// display: flex;
// placeItems: center;
// placeContent: center;
// align-items: center;
// justify-content: center;
// position: relative;
padding-top: 1rem;
padding-bottom: 1rem;
`;

const CardContainer = styled(motion.div)`
width: 34rem;
height: 56rem;
border-radius: 80px;
display: flex;
flex-direction: column;
box-shadow: 0 4px 7px 2px rgba(31, 31, 31, 0.897);
background-color: rgba(44, 44, 44, 0.897);
color: white;
position: relative
`;



const CircleWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
min-width: 100%;
min-height: 60%;
overflow: hidden;
border-top-right-radius: 80px;
`;

const Circle = styled.div`
position: absolute;
width: 34rem;
height: 34rem;
top: -4.2em;
right: -10em;
z-index: 5;
background-image: linear-gradient(45deg, #eeeb59, #701919);
border-radius: 50%;
`;

const TopContainer = styled.div`
width: 100%;
position: relative;
display: flex;
flex: 0.6;
flex-direction: column;
align-items: center;
justify-content: flex-end;
padding: 1em 15px;
`;

const BottomContainer = styled.div`
width: 120%;
display: flex;
flex-direction: column;
align-items: center;
flex: 1.4;
padding: 15px 70px 50px;
`;

const MyPhoto = styled.div`
  width: 100%;
  height: 150%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Photo = styled(motion.div)`
  width: auto;
  height: 200px;
  z-index: 150;
  user-select: none;

  img {
      width: auto;
      height: 140%;
      user-select: none;
      border-radius: 50%;
      box-shadow: 0 3px 7px 2px rgba(31, 31, 31, 0.897);
  }
  `;

const InterestsContainer = styled.div`
  width: 120%;
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1;
  `;

const MediumText = styled.span`
  padding: 1px 15px;
  `;

const SmallText = styled.span`
  font-size: small;
  `;




function About() {

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 2000], [18, -35]);
  const rotateY = useTransform(x, [0, 2000], [-25, 25]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <CardWrapper
      style={{
        width: "2000",
        height: "2000",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        perspective: 10000
      }}
      onMouseMove={handleMouse}>

      <CardContainer
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      ><div className='aboutText'>
          <h3>About me</h3>
        </div>
        <TopContainer>
          <MyPhoto>
            <Photo
              drag
              whileTap={{ cursor: "grabbing" }}
            >
              <img src="https://i.imgur.com/2EcyoeV.jpg" />
            </Photo>
          </MyPhoto>
        </TopContainer>
        <BottomContainer>
          <InterestsContainer>
            <MediumText>
              <h1 className='aboutText'>Krzysztof Sołowiej</h1>
            </MediumText>
            <SmallText><div className='aboutText'>
              <p>Junior data scientist and developer with strong background in linguistics.</p>
              <p>I'm interested in:</p>
              <ul>
                <li>ML & NLP</li>
                <li>Bioscience</li>
                <li>Electronics</li>
                <li>Web developing</li>
              </ul>
            </div>
            </SmallText>
          </InterestsContainer>
          <CircleWrapper>
            <Circle />
          </CircleWrapper>
          <Button variant="secondary" size="lg" href="https://www.linkedin.com/in/krzysztof-so%C5%82owiej-12a55024a/">LinkedIn</Button>
        </BottomContainer>
      </CardContainer>
    </CardWrapper>
  )
}


export default About