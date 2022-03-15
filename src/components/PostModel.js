import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { postArticleAPI } from "../actions";
const PostModel = (props) => {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert("Not an image");
      return;
    }
    setSharedImage(image);
  };
  const switchAssetArea = (area) => {
    setSharedImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    e.preventDefault();
    console.log("before");
    if (e.target !== e.currentTarget) {
      console.log("after");
      return;
    }
    console.log("postarticle");
    const payload = {
      image: sharedImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    console.log("now reset");
    setEditorText("");
    setSharedImage("");
    setVideoLink("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.png"></img>
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL}></img>
                ) : (
                  <img src="/images/user.svg"></img>
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => {
                    setEditorText(e.target.value);
                  }}
                  autoFocus={true}
                  placeholder="what do you wanna talk about ??"
                ></textarea>
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jgp, image/png, image/jpeg"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        Select an image
                      </label>
                    </p>

                    {sharedImage && (
                      <img src={URL.createObjectURL(sharedImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="input an video link"
                        value={videoLink}
                        onChange={(event) => {
                          setVideoLink(event.target.value);
                        }}
                      ></input>
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton
                  onClick={() => {
                    switchAssetArea("image");
                  }}
                >
                  <img src="/images/shared-img.png"></img>
                </AssetButton>
                <AssetButton
                  onClick={() => {
                    setAssetArea("media");
                  }}
                >
                  <img src="/images/shared-vid.png"></img>
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/shared-comment.png"></img>
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => {
                  postArticle(event);
                }}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-height: auto;
    color: rgba(0, 0, 0, 0.15);

    border: none;
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vartical-align: baseline;
  padding: 8px 12px;
  background: transparent;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 50px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    margin-right: 5px;
  }
`;
const PostButton = styled.div`
  min-width: 60px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.4)" : "#0a66c2")};
  text-align: center;
  padding-top: 10px;
  color: ${(props) => (props.disabled ? "rgba(1,1,0,0.8)" : "White")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: nome;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: auto;
    height: 250px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
