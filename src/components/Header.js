import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, IconButton, Tooltip, Typography } from "@mui/material"
import { Logout } from "@mui/icons-material"

import UserContext from "../contexts/UserContext"

export default function Header({ refreshUserPage, setRefreshUserPage }) {
  const { user } = useContext(UserContext)

  const [profile, setProfile] = useState({})
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (!user.token) {
      logout()
    }

    setProfile(user.user)
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function logout() {
    window.localStorage.clear()
    navigate("/sign-in")
  }

  function navigateUserPage() {
    if (setRefreshUserPage) {
      setRefreshUserPage(!refreshUserPage)
    }
    navigate(`/user/${profile.id}`)
  }

  return (
    <HeaderComponent>
      <h1 onClick={() => navigate("/")}>Twizz</h1>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar alt={profile.name} src={profile.image} {...stringAvatar(`${profile.name}`)} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            maxWidth: 170,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={navigateUserPage}>
          <Avatar />
          <Typography variant="inherit" noWrap>
            Profile
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </HeaderComponent>
  )
}

function stringToColor(string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export function stringAvatar(name) {
  const arr = name.split(" ")

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: arr.length === 1 ? `${name[0]}` : `${arr[0][0]}${arr[arr.length - 1][0]}`,
  }
}

const HeaderComponent = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 30px;
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--background-theme-dark);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-family: "Lobster", cursive;
    color: var(--site-theme);
    font-size: 30px;
    font-weight: 700;
    cursor: pointer;
  }
`
