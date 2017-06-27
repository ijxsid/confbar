import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'

const UserCardContainer = styled.div`
  width: 50%;
  max-width: 560px;
  min-width: 320px;
  margin: 30px auto;
  font-family: "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 1.02em;
  padding: 15px 0px;
  border: 1px solid #F5F7FA;
  background-color: #F5F7FA;
  border-radius: 2px;
  box-shadow: 0px 0px 4px 2px rgba(76, 76, 76, 0.1);
  transition: 0.4s box-shadow ease;

  :hover {
    box-shadow: 0px 0px 8px 4px rgba(76, 76, 76, 0.1);
  }
`
const ImageContainer = styled.div`
  width: 25%;
  margin: 0 auto;
  box-shadow: 0px 0px 4px 2px rgba(76, 76, 76, 0.1);
  border-radius: 50%;

`

const AvatarImage = styled.img`
  width: 100%;
  border-radius: 50%;
`

const InfoContainer = styled.div`
  text-align: center;
`

const UserStats = styled.div`
  display: flex;
  justify-content: space-around;
`

const UserStat = styled.div`
  display: flex;
  flex-direction: column;
`
const Stat = styled.div`
  font-size: 0.90em;
  font-weight: 700;
  margin-bottom: 10px;
  color: #575757;
`

const StatDescription = styled.div`
  font-size: 0.70em;
  color: #575757;
  font-weight: 600;
`
const TwitterLink = styled.a`
  font-size: 0.85em;
  text-decoration: none;
  font-weight: 400;
  color: #31588A;
`
const DisplayName = styled.h2`
  margin: 10px 0 0;
`

const UserCard = ({ user }) => (
  <UserCardContainer>
    <ImageContainer>
      <AvatarImage src={user.photo} alt={`Photo of ${user.displayName}`}/>
    </ImageContainer>
    <InfoContainer>
      <div>
        <DisplayName> {user.displayName} </DisplayName>
        <TwitterLink href={`https://twitter.com/${user._id}`}>{`@${user._id} on Twitter`}</TwitterLink>
      </div>
      <UserStats>
        <UserStat>
          <Stat>{user.followers}</Stat>
          <StatDescription> Followers </StatDescription>
        </UserStat>
        <UserStat>
          <Stat>{user.following}</Stat>
          <StatDescription> Following </StatDescription>
        </UserStat>
      </UserStats>
    </InfoContainer>
  </UserCardContainer>
)

UserCard.propTypes = {
  user: object.isRequired
}
export default UserCard
