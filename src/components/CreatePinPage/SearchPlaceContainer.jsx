import React, { useState } from "react";
import styled from "styled-components";
import SideSection from "../common/SideSection";
import PlainSearchBar from "./PlainSearchBar2";
import PlaceComponent from "./PlaceComponent";

const SearchPlaceContainer = ({ onPlaceSelect }) => {
    const [places, setPlaces] = useState([]);
    const [showSideBar, setShowSideBar] = useState(false);

    const handlePlaceClick = place => {
        onPlaceSelect(place);
        setShowSideBar(false);
    };

    const handleSearch = results => {
        setPlaces(results);
        setShowSideBar(false);
    };

    return (
        <SideSection showSideBar={showSideBar}>
        <Content>
            <PlainSearchBar onSearch={handleSearch}/>
            <SearchResult>
                {places.map((place, index) => (
                    <PlaceComponent 
                        key={index} 
                        placeName={place.place_name} 
                        placeAddress={place.address_name} 
                        placeId={place.id} 
                        placeLng={place.x}
                        placeLat={place.y}  
                        onPlaceClick={handlePlaceClick} 
                    />
                ))}
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
