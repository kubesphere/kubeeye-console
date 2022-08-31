import React from 'react';
import { Button } from '@kubed/components';
import { Download, Trash } from '@kubed/icons';
import { InstallState } from '../../libs/types';

type Props = {
  state: InstallState;
  onClick: () => void;
};

const InstallSwitch = ({ state, onClick }: Props) => {
  let loading: boolean;
  let content: string;
  let color: string;
  let icon = <Download color="white" size="13px" />;

  if (state === 'installing') {
    loading = true;
    content = '安装中';
    color = 'secondary';
    icon = <Download color="white" size="13px" />;
  } else if (state == 'uninstalling') {
    loading = true;
    content = '卸载中';
    color = 'error';
    icon = <Trash color="white" size="13px" />;
  } else if (state === 'installed') {
    loading = false;
    content = '卸载';
    color = 'error';
    icon = <Trash color="white" size="13px" />;
  } else {
    loading = false;
    content = '安装';
    color = 'secondary';
    icon = <Download color="white" size="13px" />;
  }

  return (
    <Button
      variant="filled"
      color={color}
      leftIcon={icon}
      loading={loading}
      shadow
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default InstallSwitch;
