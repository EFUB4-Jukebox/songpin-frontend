import MostRegisterGenreEx from "../../assets/introduce/mostRegisterGenreEx.svg";
import styled from "styled-components";
import { GenreList } from "../../constants/GenreList";
import Genre from "../common/Genre";
import { useEffect, useState } from "react";
import { getStats, getStatsGenre } from "../../services/api/stats";
import DynamicSvg from "./dynamicImg";

const Stats = () => {
  const [pinNum, setPinNum] = useState();
  const [popularSongArtist, setPopularSongArtist] = useState();
  const [popularSongTitle, setPopularSongTitle] = useState();
  const [popularImgSrc, setPopularImgSrc] = useState();
  const [popularPlaceName, setPopularPlaceName] = useState();
  const [popularGenre, setPopularGenre] = useState();
  const [popularGenreName, setPopularGenreName] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [genrePlaceId, setGenrePlaceId] = useState(1);
  const [genreSongId, setGenreSongId] = useState(1);
  const [genrePlaceTitle, setGenrePlaceTitle] = useState();
  const [genrePlaceLat, setGenrePlaceLat] = useState();
  const [genrePlaceLng, setGenrePlaceLng] = useState();
  const [genreSongeArtist, setGenreSongeArtist] = useState();
  const [genreSongTitle, setGenreSongTitle] = useState();
  const [genreSongImgSrc, setGenreSongImgSrc] = useState();

  useEffect(() => {
    const handlePlace = async () => {
      const res = await getStatsGenre();
      const placeList = res.placeList;
      console.log(placeList);

      const selectedPlace = placeList.find(
        (_, index) => index === genrePlaceId,
      );
      setGenrePlaceTitle(selectedPlace.placeName);
      setGenrePlaceLat(selectedPlace.latitude);
      setGenrePlaceLng(selectedPlace.longitude);
    };
    handlePlace();
  }, [genrePlaceId]);

  useEffect(() => {
    const handleSong = async () => {
      const res = await getStatsGenre();
      const songList = res.songList;
      const selectedSong = songList.find((it, index) => index === genreSongId);
      setGenreSongeArtist(selectedSong.artist);
      setGenreSongTitle(selectedSong.title);
      setGenreSongImgSrc(selectedSong.imgPath);
    };
    handleSong();
  }, [genreSongId]);

  const handleGenrePlace = async id => {
    setGenrePlaceId(id);
  };

  const handleGenreSong = id => {
    setGenreSongId(id);
  };

  useEffect(() => {
    const getStatsAll = async () => {
      try {
        const res = await getStats();
        console.log(res);
        setPinNum(res.totalPinCount);
        setPopularSongArtist(res.popularSong.artist);
        setPopularSongTitle(res.popularSong.title);
        setPopularImgSrc(res.popularSong.imgPath);
        setPopularPlaceName(res.popularPlace.placeName);
        setPopularGenre(res.popularGenreName);
        const genre = GenreList.find(it => it.EngName === popularGenre);
        setPopularGenreName(genre.name);
        setLat(res.popularPlace.latitude);
        setLng(res.popularPlace.longitude);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getStatsAll();
  }, []);

  const hasFinalConsonant = char => {
    const charCode = char.charCodeAt(0); //이름 끝자의 유니코드 값
    const diff = charCode - 0xac00; //유니코드 값에서 한글 음절의 시작점인 0XAC00을 뺌
    const jong = diff % 28; //남은 값을 28로 나눠서 나머지 구함
    return jong !== 0; //나머지가 0이 아니면 받침 존재
  };
  const getPostPosition = popularGenreName => {
    if (!popularGenreName) return "예요"; //닉네임이 없으면 기본 조사 '은'
    const lastChar = popularGenreName[popularGenreName.length - 1];
    return hasFinalConsonant(lastChar) ? "이에요" : "예요";
  };

  return (
    <>
      <Wrapper>
        <TotalPin>
          <div>
            올해 등록된 총 핀 개수는 <br /> {pinNum && pinNum}개예요.
          </div>
          <TotalNumber>
            <div>{pinNum && pinNum}개</div>
          </TotalNumber>
        </TotalPin>
        <MostRegisterSong>
          <div>
            가장 많이 등록된 노래는
            <Song>
              <br /> {popularSongArtist && popularSongArtist} -<br />“
              {popularSongTitle && popularSongTitle}”예요.
            </Song>
          </div>
          <div>
            <DynamicSvg imageUrl={popularImgSrc} />
          </div>
        </MostRegisterSong>
        <MostRegisterPlace>
          <div>
            가장 많이 등록된 장소는
            <br /> <Place>{popularPlaceName && popularPlaceName}</Place>이에요.
          </div>
          <div>
            <DynamicSvg id="popular-place-map" lat={lat} lng={lng} />
          </div>
        </MostRegisterPlace>
        <MostRegisterGenre>
          <div>
            가장 많이 등록된 장르는 {""}
            <GenreName>{popularGenreName && popularGenreName}</GenreName>
            {popularGenreName && getPostPosition(popularGenreName)}
          </div>
          <div>
            <img src={MostRegisterGenreEx} />
          </div>
        </MostRegisterGenre>
        <MostListenGenreWrapper>
          <MostListenGenre>
            <div className="genreText">
              {GenreList.find(it => it.id === genrePlaceId) && (
                <Genre
                  key={GenreList.find(it => it.id === genrePlaceId).id}
                  name={GenreList.find(it => it.id === genrePlaceId).name}
                  img={GenreList.find(it => it.id === genrePlaceId).whiteImgSrc}
                  bgColor={GenreList.find(it => it.id === genrePlaceId).bgColor}
                  height="35px"
                  text="28px"
                />
              )}

              <div>장르를 가장 많이 듣는 장소는</div>
            </div>
            <span className="placeName">
              {genrePlaceTitle && genrePlaceTitle}
            </span>
            <span>{genrePlaceTitle && getPostPosition(genrePlaceTitle)}</span>
          </MostListenGenre>
          <TotalGenre>
            {GenreList.map(it => (
              <Genre
                key={it.id}
                onClick={() => {
                  handleGenrePlace(it.id);
                }}
                name={it.name}
                img={it.id == genrePlaceId ? it.whiteImgSrc : it.imgSrc}
                bgColor={it.id === genrePlaceId ? "#232323" : undefined}
              />
            ))}
          </TotalGenre>
          <DynamicSvg
            id="popular-genre-map"
            lat={genrePlaceLat}
            lng={genrePlaceLng}
          />
        </MostListenGenreWrapper>
        <MostListenGenreWrapper>
          <MostListenGenre>
            <div className="genreText">
              {GenreList.find(it => it.id === genreSongId) && (
                <Genre
                  key={GenreList.find(it => it.id === genreSongId).id}
                  name={GenreList.find(it => it.id === genreSongId).name}
                  img={GenreList.find(it => it.id === genreSongId).whiteImgSrc}
                  bgColor={GenreList.find(it => it.id === genreSongId).bgColor}
                  height="35px"
                  text="28px"
                />
              )}
              <div>장르 중 가장 인기가 많은 곡은</div>
            </div>
            <span className="placeName">{genreSongeArtist}</span>
            <br />
            <span className="placeName">"{genreSongTitle}"</span>
            <span> 이에요.</span>
          </MostListenGenre>
          <TotalGenre>
            {GenreList.map(it => (
              <Genre
                key={it.id}
                onClick={() => {
                  handleGenreSong(it.id);
                }}
                name={it.name}
                img={it.id == genreSongId ? it.whiteImgSrc : it.imgSrc}
                bgColor={it.id === genreSongId ? "#232323" : undefined}
              />
            ))}
          </TotalGenre>
          <DynamicSvg imageUrl={genreSongImgSrc} />
        </MostListenGenreWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 180px;
`;
const TotalPin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 190px;
  align-items: center;
  text-align: center;
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;
const TotalNumber = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const MostRegisterSong = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  text-align: center;
  align-items: center;
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;
const Song = styled.span`
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
`;
const MostRegisterPlace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  text-align: center;
  align-items: center;
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;
const Place = styled.span`
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  background-color: #b6ff5a;
`;
const MostRegisterGenre = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  text-align: center;
  align-items: center;
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;
const GenreName = styled.span`
  color: var(--light_black, #232323);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  background-color: #d9a8ff;
`;

const MostListenGenre = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */

  .placeName {
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
  }
  .genreText {
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px; /* 125% */
  }
`;
const TotalGenre = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 470px;
  gap: 4px;
`;
const MostListenGenreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 49px;
  width: 600px;
`;
export default Stats;
