// @flow
import React from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import {
  OutlineButton,
  PrimaryButton,
  FacebookButton,
  TwitterButton,
} from 'src/components/button';
import { ButtonRow, InputRow, Input } from './style';
import { Description } from '../../style';
import { Loading } from 'src/components/loading';
import Clipboard from 'react-clipboard.js';

const Share = ({ community, onboarding }) => {
  if (!community) return <Loading />;

  return (
    <div>
      <ButtonRow>
        <FacebookButton
          href={`https://www.facebook.com/sharer/sharer.php?u=http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com/${encodeURIComponent(
            community.slug
          )}&t=Come hang out with me in the ${
            community.name
          } community on Spectrum!`}
        >
          Share on Facebook
        </FacebookButton>

        <TwitterButton
          href={`https://twitter.com/share?text=Come hang out with me in the ${
            community.name
          } community on @withspectrum!&url=http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com/${encodeURIComponent(
            community.slug
          )}`}
        >
          Share on Twitter
        </TwitterButton>
      </ButtonRow>

      <Clipboard
        component="div"
        data-clipboard-text={`http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com/${community.slug}`}
      >
        <InputRow>
          <Input>{`http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com/${community.slug}`}</Input>
        </InputRow>
      </Clipboard>

      {onboarding && (
        <ButtonRow>
          <Description centered>
            You’re ready to start building your community - you can view it now,
            or manage your settings at any time
          </Description>
          <OutlineButton to={`/${community.slug}/settings`}>
            View community settings
          </OutlineButton>
          <PrimaryButton to={`/${community.slug}`}>
            Go to my community
          </PrimaryButton>
        </ButtonRow>
      )}
    </div>
  );
};

export default compose(withRouter)(Share);
