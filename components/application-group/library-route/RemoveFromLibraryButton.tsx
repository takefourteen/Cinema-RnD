import React from 'react'

import {PiX} from "react-icons/pi";

type Props = {
    id: string;
    type: "movie" | "tv";
}

const RemoveFromLibraryButton: React.FC<Props> = ({
    id,
    type
}) => {
  return (
    <div>RemoveFromLibraryButton</div>
  )
}

export default RemoveFromLibraryButton