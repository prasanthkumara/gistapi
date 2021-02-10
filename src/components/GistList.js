import React, { useEffect, useState } from "react";
import { getPublicGists, getGistForUser } from "../services/gistService";
import Octicon from "react-octicon";
import styled from "styled-components";

/*
  Renders Gist user list based on props value
*/
const GistList = (props) => {
  const [list, setList] = useState([]);
  /*
    Check for search keyword from props username and calls subsequent API
   */
  useEffect(() => {
    if (!props.username) {
      /* Calls Public API for all list */
      getPublicGists().then(
        (response) => {
          setList(response.data);
        },
        () => {
          setList([]);
        }
      );
    } else {
      /* Calls user specific api as username search keyword is non-empty */
      getGistForUser(props.username).then(
        (response) => {
          setList(response.data);
        },
        () => {
          setList([]);
        }
      );
    }
  }, [setList, props.username]);
  return (
    <Wrapper data-testid="gitlist">
      {list.length > 0 ? (
        list.map((row) => (
          <GistUser>
            <UserRow>
              <UserInfo>
                <Avatar
                  alt={row.owner.login}
                  src={row.owner.avatar_url}
                ></Avatar>
                <Link href={row.owner.url}>{row.owner.login}</Link>
              </UserInfo>
              <GistActions>
                <Link href={row.html_url}>
                  <Octicon name="code" />
                  {Object.keys(row.files).length}
                  <span> Files</span>
                </Link>
                <Link href={row.forks_url}>
                  <Octicon name="repo-forked" />
                  <span> Forks</span>
                </Link>
                <Link href={row.comments_url}>
                  <Octicon name="comment" />
                  <span> Comments</span>
                </Link>
                <Link href={row.commits_url}>
                  <Octicon name="star" />
                  <span> Stars</span>
                </Link>
              </GistActions>
            </UserRow>
            <LastUpdated>
              <Time>Created at: {formatDate(row.created_at)}</Time>
              <Time>Last updated: {formatDate(row.updated_at)}</Time>
            </LastUpdated>
            <Description>{row.description}</Description>
            <FilesList>
              {Object.keys(row.files).map((file) => (
                <React.Fragment>
                  <Link href={row.files[file].raw_url}>
                    <Octicon name="file" />
                    {file}
                  </Link>
                </React.Fragment>
              ))}
            </FilesList>
          </GistUser>
        ))
      ) : (
        <GistUser>
          <NoUser>No User Found</NoUser>
        </GistUser>
      )}
    </Wrapper>
  );
};

const formatDate = (date) => {
    const obj = new Date(date);
    return `${obj.getDate()}/${obj.getMonth()}/${obj.getFullYear()}`;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GistUser = styled.div`
  width: 500px;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eef0f1;
`;

const Avatar = styled.img`
  width: 30px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  width: 200px;
`;

const GistActions = styled.div`
  font-size: 12px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Link = styled.a`
  margin-left: 10px;
`;

const LastUpdated = styled.div`
  font-size: 11px;
  color: #626465;
`;

const Description = styled.div`
  font-size: 13px;
  color: #626465;
  margin: 10px 0px;
`;

const FilesList = styled.div`
  font-size: 13px;
  color: #626465;
  margin: 10px 0;
`;

const NoUser = styled.div`
  text-align: center;
`;

const Time = styled.span`
  margin-right: 10px;
`;

export default GistList;
