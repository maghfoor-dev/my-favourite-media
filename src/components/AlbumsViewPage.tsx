import { useState } from "react";
import { AlbumDataTypes } from "../utils/AlbumDataType";
import filterDuplicateAlbums from "../utils/helper-functions/filterDuplicateAlbums";

interface AlbumsViewProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
  passAccessToken: string;
  passArtistID: string;
  passRunAlbumsBtn: boolean;
}

export default function AlbumsViewPage(props: AlbumsViewProps): JSX.Element {
  const [albums, setAlbums] = useState<[] | AlbumDataTypes[]>([]);

  const GettingAlbums = async () => {
    const searchParamsforArtistsAndAlbums = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.passAccessToken,
      },
    };

    await fetch(
      `https://api.spotify.com/v1/artists/${props.passArtistID}/albums?include_groups=album&market=GB&limit=50`,
      searchParamsforArtistsAndAlbums
    )
      .then((result) => result.json())
      .then((jsonResult) => setAlbums(jsonResult.items));
  };

  const uniqueAlbums = filterDuplicateAlbums(albums);

  return (
    <>
      <h1>ALBUMS</h1>
      <hr />
      <button className="Button" onClick={() => GettingAlbums()}>
        GET ALBUMS
      </button>
      <div className="AllTheArtists">
        {uniqueAlbums
          .filter((album) => album.name)
          .map((album) => {
            return (
              <div className="EachArtist" key={album.id}>
                <img src={album.images[1]?.url} alt="album Cover" />
                <p>{album.name}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
