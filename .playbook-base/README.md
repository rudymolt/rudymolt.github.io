# .playbook-base/

Machine-owned pristine copies of playbook-managed files, recorded at bootstrap
and refreshed by `/ai-playbook-upgrade-project`. They are the merge base that
lets upgrades preserve project customisations. Agents do not read this folder;
humans do not edit it. Commit it — future upgrades need it intact.
