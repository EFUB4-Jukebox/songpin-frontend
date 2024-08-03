import React, { useState } from 'react';
import styled from 'styled-components';
import SideSection from '../common/SideSection';
import PlainSearchBar from './PlainSearchBar';
import PlaceComponent from './PlaceComponent';

const SearchPlaceContainer = ({onPlaceSelect}) => {
    const handlePlaceClick = (placeName) => {
        onPlaceSelect(placeName);
        setShowSideBar(false);
    };
    
    const [showSideBar, setShowSideBar] = useState(false);

    
    return (
            <SideSection showSideBar={showSideBar}>
                <Content>
                    <PlainSearchBar />
                    <SearchResult>
                        <PlaceComponent onPlaceClick={handlePlaceClick}/>
                        <PlaceComponent onPlaceClick={handlePlaceClick}/>
                        <PlaceComponent onPlaceClick={handlePlaceClick}/>
                    </SearchResult>
                </Content>
            </SideSection>
        );
    };

export default SearchPlaceContainer;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    background-color: white;
`;

const SearchResult = styled.div``;
