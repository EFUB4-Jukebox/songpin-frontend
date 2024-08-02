import React, { useState } from 'react';
import styled from 'styled-components';
import SideSection from './SideSection';
import PlainSearchBar from './PlainSearchBar';
import PlaceComponent from './PlaceComponent';

const SearchPlaceContainer = ({onPlaceSelect}) => {
    const handlePlaceClick = (placeName) => {
        onPlaceSelect(placeName);
    };
    
    return (
            <SideSection>
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
`;

const SearchResult = styled.div``;
