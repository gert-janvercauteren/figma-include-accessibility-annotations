import * as React from 'react';
import { AnnotationStepPage } from '../components';
import Context from '../context';

function OtherAnnotations() {
  const cnxt = React.useContext(Context);
  const { pageType } = cnxt;

  // ui state
  const routeName = 'Other annotations';

  return (
    <AnnotationStepPage
      title="Other annotations"
      routeName={routeName}
      bannerTipProps={{ pageType, routeName }}
    >
      <React.Fragment>
        <div>Dummy component</div>
        <div>Bootstrapping</div>
      </React.Fragment>
    </AnnotationStepPage>
  );
}

export default OtherAnnotations;
