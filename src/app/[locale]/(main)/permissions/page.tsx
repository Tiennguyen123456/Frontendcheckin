"use client";
import { IPermissionRes, IRoleRes } from "@/models/api/authority-api";
import authorityApi from "@/services/authority-api";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Typography, FormControlLabel, FormControl, Checkbox, InputLabel, MenuItem, Divider } from "@mui/material";
import { StyledContentWrapper, StyledPrimaryButton } from "@/styles/commons";
import HeadContent from "../../../../components/common/HeadContent";
import { useTranslations } from "next-intl";
import SelectField from "../../../../components/common/Select";
import { toastError, toastSuccess } from "../../../../utils/toast";
import { IOption } from "../../../../models/Select";
import { useAppSelector } from "../../../../redux/root/hooks";
import { selectCommon } from "../../../../redux/common/slice";
import clsx from "clsx";

type Props = {};

const PermissionsPage = (props: Props) => {
  // ** I18n
  const translate = useTranslations();

  // ** Redux
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  // ** State
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState<IOption[]>([]);
  const [permissions, setPermissions] = useState<IPermissionRes[]>([]);
  const [permissionValues, setPermissionValues] = useState<any[]>([]);
  const [expandList, setExpandList] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  // ** Functions
  const handleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleCheckAllPerMissionValue = (groupValue: any) => {
    const groups = [...permissionValues];

    const existingGroupIndex = groups.findIndex((selectedGroup) => selectedGroup.groupName === groupValue.groupName);

    if (existingGroupIndex !== -1) {
      groups.splice(existingGroupIndex, 1);
    } else {
      const allItemsInGroup = groupValue.names.map((item: any) => ({
        id: item.id,
        permissionName: item.permissionName,
      }));
      groups.push({ groupName: groupValue.groupName, names: allItemsInGroup });
    }

    setPermissionValues(groups);
  };

  const handleChangePermissionValues = (groupValue: any, item: any) => {
    let permissionGroups = [...permissionValues];
    const existingGroupIndex = permissionGroups.findIndex(
      (selectedGroup) => selectedGroup.groupName === groupValue.groupName,
    );

    if (existingGroupIndex !== -1) {
      const existingGroup = permissionGroups[existingGroupIndex];
      const existingItemIndex = existingGroup.names.findIndex((groupItem: any) => groupItem.id === item.id);

      if (existingItemIndex !== -1) {
        // console.log(existingGroup);

        existingGroup.names.splice(existingItemIndex, 1);
        if (existingGroup.names.length === 0) {
          permissionGroups.splice(existingGroupIndex, 1);
        }
      } else {
        existingGroup.names.push({ id: item.id, permissionName: item.permissionName });
      }
    } else {
      permissionGroups.push({
        groupName: groupValue.groupName,
        names: [{ id: item.id, permissionName: item.permissionName }],
      });
    }

    setPermissionValues(permissionGroups);
  };

  const handleExpandedListItem = (key: string) => {
    const array = [...expandList];
    const index = array.indexOf(key);

    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(key);
    }

    setExpandList(array);
  };

  const handleGetListRoles = async () => {
    try {
      const response = await authorityApi.getRoles();
      const tempRoleList = response.collection.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      setRoles(tempRoleList);
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translate(`errorApi.${data?.message_code}`));
      } else {
        toastError(translate("errorApi.LOGIN_FAILED"));
      }
    }
  };

  const handleRefactorResponse = async (response: any) => {
    const groupedPermissions = response.collection.reduce((acc: any, permission: any) => {
      const [groupName, permissionName] = permission.name.split(":");

      const existingGroup = acc.find((group: any) => group.groupName === groupName);

      if (existingGroup) {
        existingGroup.names.push({
          id: permission.id,
          permissionName: [permissionName],
        });
      } else {
        acc.push({
          groupName,
          names: [
            {
              id: permission.id,
              permissionName: [permissionName],
            },
          ],
        });
      }

      return acc;
    }, []);
    return groupedPermissions;
  };

  const handleGetListPermission = async () => {
    try {
      const response = await authorityApi.getPermissions(100);
      const groupedPermissions = await handleRefactorResponse(response);

      setPermissions(groupedPermissions);
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translate(`errorApi.${data?.message_code}`));
      } else {
        toastError(translate("errorApi.GET_LIST_PERMISSIONS_FAILED"));
      }
    }
  };

  const handleGetPerMissionsFromRole = async () => {
    try {
      const response = await authorityApi.getPermissionsFromRole(parseInt(selectedRole));
      const groupedPermissions = await handleRefactorResponse(response);

      setPermissionValues(groupedPermissions);
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translate(`errorApi.${data?.message_code}`));
      } else {
        toastError(translate("errorApi.GET_LIST_PERMISSIONS_FROM_ROLE_FAILED"));
      }
    }
  };

  const handleSavePermissions = async () => {
    try {
      setLoading(true);
      let allRolePermissions: any[] = [];

      const selectPermissions = permissionValues;
      const selectTedPermissionsList = selectPermissions.map((permission) => permission.names).flat();
      const permissionList = permissions.map((permission) => permission.names).flat();

      for (let i = 0; i < permissionList.length; i++) {
        allRolePermissions = [...allRolePermissions, [selectTedPermissionsList[i]]];
      }

      const permissionIds = allRolePermissions.map((permission) => permission[0]?.id);
      const filteredPermissionIds = permissionIds.filter((id) => id !== null && id !== undefined);

      const model = {
        role_id: parseInt(selectedRole),
        permission_ids: filteredPermissionIds,
      };

      const response = await authorityApi.updatePermissions(model);

      if (response.status === "success") {
        setLoading(false);
        toastSuccess(translate("successApi.SAVE_PERMISSIONS_FOR_ROLE_SUCCESS"));
      }
    } catch (error: any) {
      console.log("error: ", error);
      setLoading(false);

      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translate(`errorApi.${data?.message_code}`));
      } else {
        toastError(translate("errorApi.GET_LIST_PERMISSIONS_FROM_ROLE_FAILED"));
      }
    }
  };

  useEffect(() => {
    handleGetListRoles();
    handleGetListPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedRole) handleGetPerMissionsFromRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  return (
    <div className="p-3">
      <HeadContent title={translate("permissionsPage.title")}></HeadContent>

      <StyledContentWrapper>
        <div>
          <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
            <SelectField
              label={translate("label.role")}
              placeholder={translate("placeholder.role")}
              value={selectedRole}
              onChange={handleChange}
              options={roles}
            />
          </FormControl>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-x-2">
            <span className="font-semibold uppercase">{translate("permissionsPage.title")}</span>
            <Divider className="flex-1" textAlign="right">
              <StyledPrimaryButton
                disabled={Boolean(!selectedRole)}
                loading={isLoading}
                loadingPosition="start"
                onClick={() => handleSavePermissions()}
              >
                {translate("action.save")}
              </StyledPrimaryButton>
            </Divider>
          </div>

          <div
            className={clsx(
              "grid lg:grid-cols-4 gap-4 mt-5",
              isSideBarCollapse ? " md:grid-cols-3" : " md:grid-cols-2",
            )}
          >
            {permissions.map((permission) => (
              <div key={permission.id} className="flex flex-1 flex-col max-w-[calc(33.33%-8px)] gap-y-2">
                <div className={`flex gap-x-[6px] flex-col ${expandList?.includes(permission.groupName)} ? : `}>
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 flex-shrink-0 cursor-pointer mr-[2px] transition-all ease duration-400 ${
                        expandList?.includes(permission.groupName) ? "rotate-90" : "rotate-0"
                      } `}
                      onClick={() => handleExpandedListItem(permission.groupName)}
                    >
                      <ChevronRightIcon />
                    </div>
                    <FormControlLabel
                      label={permission.groupName}
                      control={
                        <Checkbox
                          checked={Boolean(
                            permissionValues.some(
                              (item) =>
                                item.groupName === permission.groupName &&
                                item.names.length === permission.names.length,
                            ),
                          )}
                          indeterminate={Boolean(
                            permissionValues.some(
                              (item) =>
                                item.groupName === permission.groupName &&
                                item.names.length !== permission.names.length,
                            ),
                          )}
                          onChange={() => handleCheckAllPerMissionValue(permission)}
                        />
                      }
                    />
                  </div>
                  <div
                    className={`min-w-[180px] max-h-0 transition-all duration-300 ease overflow-hidden ${
                      expandList?.includes(permission.groupName) ? "max-h-[100%]" : "max-h-0"
                    }`}
                  >
                    <div className="w-full max-h-full flex flex-col whitespace-nowrap ml-10">
                      {permission.names.map((item: any) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.permissionName}
                          control={
                            <Checkbox
                              checked={Boolean(
                                permissionValues.some((permissionGroup) =>
                                  permissionGroup.names.some((groupItem: any) => groupItem.id === item.id),
                                ),
                              )}
                              onChange={() => handleChangePermissionValues(permission, item)}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StyledContentWrapper>
    </div>
  );
};

export default PermissionsPage;
