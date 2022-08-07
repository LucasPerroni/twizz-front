import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useContext } from "react"

import { stringAvatar } from "./Header"
import { CardActionArea } from "@mui/material"
import UserContext from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function UserDeck({ cardData, refreshPage, setRefreshPage }) {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  let userData = {}
  let data = {}
  let publish = ""

  function navigateUserPage() {
    navigate(`/user/${userData.id}`)
    if (setRefreshPage) {
      setRefreshPage(!refreshPage)
    }
  }

  if (cardData) {
    userData = { ...cardData.user }
    data = { id: cardData.id, description: cardData.description, name: cardData.name }
    const date = new Date(cardData.createdAt)
    publish = `${months[date.getMonth() - 1]} ${date.getDay()}, ${date.getFullYear()}`
  }

  return (
    <StyledCard sx={{ maxWidth: 345, minWidth: 275 }}>
      <StyledHeader
        avatar={
          <StyledAvatar
            alt={userData.name}
            src={userData.image}
            {...stringAvatar(`${userData.name}`)}
            onClick={navigateUserPage}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userData.name}
        titleTypographyProps={{ fontWeight: 700 }}
        subheader={publish}
      />
      <StyledActionArea onClick={() => navigate(`/deck/${data.id}`)}>
        <CardContent>
          <StyledText gutterBottom variant="h5" component="div" fontWeight={700} className="title">
            {data.name}
          </StyledText>
          <StyledText variant="body2" color="text.secondary">
            {data.description}
          </StyledText>
        </CardContent>
      </StyledActionArea>
      {user.user.id === userData.id ? (
        <></>
      ) : (
        <StyledFooter disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </StyledFooter>
      )}
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  border-radius: 10px;
  outline: 1px solid var(--card-theme-dark);
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
`

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

const StyledHeader = styled(CardHeader)`
  background-color: var(--card-theme-dark);

  * {
    color: #ffffff !important;
  }
`

const StyledActionArea = styled(CardActionArea)`
  background-color: var(--card-theme);
`

const StyledText = styled(Typography)`
  color: #ffffff;
  text-align: justify;

  &.title {
    text-align: center;
  }
`

const StyledFooter = styled(CardActions)`
  background-color: var(--card-theme-dark);

  * {
    color: #ffffff !important;
  }
`
