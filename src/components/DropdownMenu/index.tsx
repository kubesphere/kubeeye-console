import React from 'react';
import { Dropdown, Menu, MenuItem, Button } from '@kubed/components';
import { Trash, Success, More } from '@kubed/icons';

type Props = {
  triggerAuditHandler: () => void;
  uninstallHandler: () => void;
};

const DropdownMenu = ({ triggerAuditHandler, uninstallHandler }: Props) => {
  const menu = (
    <Menu style={{ width: '200px' }}>
      <MenuItem icon={<Success />} onClick={triggerAuditHandler}>
        启动巡检
      </MenuItem>
      <MenuItem icon={<Trash />} onClick={uninstallHandler}>
        卸载
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown content={menu} placement="bottom-end">
      <Button variant="text" radius="lg" size="sm">
        <More size={16} />
      </Button>
    </Dropdown>
  );
};

export default DropdownMenu;
