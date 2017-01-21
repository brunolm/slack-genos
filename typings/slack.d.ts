declare module "slack" {
  export const auth: SlackAuth;
  export const api: SlackAPI;
  export const rtm: SlackRMT;
  export const channels: SlackChannels;
  export const chat: SlackChat;
  export const users: SlackUsers;

  interface SlackChannelInfo {
    ok: boolean;
    channel: {
      id: string;
      name: string;

      created: number;
      creator: string;

      is_archived: boolean;
      is_general: boolean;
      is_member: boolean;
      is_starred: boolean;

      members: string[];

      topic: any;
      purpose: any;

      last_read: number;
      latest: any;
      unread_count: number;
      unread_count_display: number;
    }
  }

  interface SlackUserInfo {
    ok: boolean;
    user: {
      id: string;
      name: string;
      deleted: boolean;
      color: string;
      profile: {
        first_name: string;
        last_name: string;
        real_name: string;
        email: string;
        skype: string;
        phone: string;
        image_24: string;
        image_32: string;
        image_48: string;
        image_72: string;
        image_192: string;
      },
      is_admin: boolean;
      is_owner: boolean;
      has_2fa: boolean;
    };
  }

  interface SlackSelfInfo {
    ok: boolean;
    url: string;
    team: string;
    user: string;
    team_id: string;
    user_id: string;
  }

  interface SlackChannels {
    info: ({ token, channel }: { token: string; channel: string; }, callback: SlackCallback<SlackChannelInfo>) => void;
  }

  interface SlackUsers {
    info: ({ token, user }: { token: string; user: string; }, callback: SlackCallback<SlackUserInfo>) => void;
  }

  type SlackCallback<T> = (err, data: T) => void;

  interface SlackAuth {
    test: ({ token }, callback: SlackCallback<SlackSelfInfo>) => void;
  }

  interface PostMessage {
    token?: string;
    channel: string;
    text: string;
    as_user?: boolean;
  }
  interface SlackChat {
    postMessage: (message: PostMessage, callback: SlackCallback<SlackSelfInfo>) => void;
  }

  interface SlackAPI {
  }

  interface SlackMessage {
    type: 'message';
    subtype?: 'file_share';
    channel: string;
    user: string;
    text: string;
    ts: string;
    team: string;
    file?:
    {
      id: string;
      created: number;
      timestamp: number;
      name: string;
      title: string;
      mimetype: string;
      filetype: string;
      pretty_type: string;
      user: string;
      editable: boolean;
      size: number;
      mode: 'snippet' | 'hosted';
      is_external: boolean;
      external_type: string;
      is_public: boolean;
      public_url_shared: boolean;
      display_as_bot: boolean;
      username: string;
      url_private: string;
      url_private_download: string;
      permalink: string;
      permalink_public: string;
      edit_link: string;
      preview: string;
      preview_highlight: string;
      lines: number;
      lines_more: number;
      preview_is_truncated: boolean;
      channels: string[];
      groups: string[];
      ims: string[];
      comments_count: number;
    },
    upload: boolean;
    display_as_bot: boolean;
    username: string;
    bot_id: any;
  }

  interface Bot {
    handlers: {
      started: any[];
      hello: any[];
      message: any[];
    },
    hello: (handler: ({ type }: { type: string; }) => void) => void;
    message: (handler: (message: SlackMessage) => void) => void;
    close: () => void;
    listen: (params, callback) => void;
  }

  interface SlackRMT {
    client: () => Bot;
  }
}

/**
export default function client(token: any): {
    auth: {
        test: {};
    };
    bots: {
        info: {};
    };
    channels: {
        archive: {};
        create: {};
        history: {};
        info: {};
        invite: {};
        join: {};
        kick: {};
        leave: {};
        list: {};
        mark: {};
        rename: {};
        setPurpose: {};
        setTopic: {};
        unarchive: {};
    };
    chat: {
        delete: {};
        meMessage: {};
        postMessage: {};
        update: {};
    };
    dnd: {
        endDnd: {};
        endSnooze: {};
        info: {};
        setSnooze: {};
        teamInfo: {};
    };
    emoji: {
        list: {};
    };
    files: {
        comments: {
            add: {};
            delete: {};
            edit: {};
        };
        delete: {};
        info: {};
        list: {};
        revokePublicURL: {};
        sharedPublicURL: {};
        upload: {};
    };
    groups: {
        archive: {};
        close: {};
        create: {};
        createChild: {};
        history: {};
        info: {};
        invite: {};
        kick: {};
        leave: {};
        list: {};
        mark: {};
        open: {};
        rename: {};
        setPurpose: {};
        setTopic: {};
        unarchive: {};
    };
    im: {
        close: {};
        history: {};
        list: {};
        mark: {};
        open: {};
    };
    mpim: {
        close: {};
        history: {};
        list: {};
        mark: {};
        open: {};
    };
    pins: {
        add: {};
        list: {};
        remove: {};
    };
    reactions: {
        add: {};
        get: {};
        list: {};
        remove: {};
    };
    reminders: {
        add: {};
        complete: {};
        delete: {};
        info: {};
        list: {};
    };
    rtm: {
        start: {};
    };
    search: {
        all: {};
        files: {};
        messages: {};
    };
    stars: {
        add: {};
        list: {};
        remove: {};
    };
    team: {
        accessLogs: {};
        billableInfo: {};
        info: {};
        integrationLogs: {};
        profile: {
            get: {};
        };
    };
    usergroups: {
        create: {};
        disable: {};
        enable: {};
        list: {};
        update: {};
        users: {
            list: {};
            update: {};
        };
    };
    users: {
        deletePhoto: {};
        getPresence: {};
        identity: {};
        info: {};
        list: {};
        profile: {
            get: {};
            set: {};
        };
        setActive: {};
        setPhoto: {};
        setPresence: {};
    };
};
export default function apitest(params: any, callback: any): void;
export default function authrevoke(params: any, callback: any): void;
export default function authtest(params: any, callback: any): void;
declare var _default: {
    info: (params: any, callback: any) => void;
};
export default _default;
export default function botsinfo(params: any, callback: any): void;
export default function channelsarchive(params: any, callback: any): void;
export default function channelscreate(params: any, callback: any): void;
declare var _default: {
    archive: (params: any, callback: any) => void;
    create: (params: any, callback: any) => void;
    history: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    invite: (params: any, callback: any) => void;
    join: (params: any, callback: any) => void;
    kick: (params: any, callback: any) => void;
    leave: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    mark: (params: any, callback: any) => void;
    rename: (params: any, callback: any) => void;
    setPurpose: (params: any, callback: any) => void;
    setTopic: (params: any, callback: any) => void;
    unarchive: (params: any, callback: any) => void;
};
export default _default;
export default function channelshistory(params: any, callback: any): void;
export default function channelsinfo(params: any, callback: any): void;
export default function channelsinvite(params: any, callback: any): void;
export default function channelsjoin(params: any, callback: any): void;
export default function channelskick(params: any, callback: any): void;
export default function channelsleave(params: any, callback: any): void;
export default function channelslist(params: any, callback: any): void;
export default function channelsmark(params: any, callback: any): void;
export default function channelsrename(params: any, callback: any): void;
export default function channelssetPurpose(params: any, callback: any): void;
export default function channelssetTopic(params: any, callback: any): void;
export default function channelsunarchive(params: any, callback: any): void;
declare var _default: {
    postMessage: (params: any, callback: any) => void;
    delete: (params: any, callback: any) => void;
    update: (params: any, callback: any) => void;
    meMessage: (params: any, callback: any) => void;
};
export default _default;
export default function chatdelete(params: any, callback: any): void;
export default function chatmeMessage(params: any, callback: any): void;
export default function chatpostMessage(params: any, callback: any): void;
export default function chatupdate(params: any, callback: any): void;
declare var _default: {
    info: (params: any, callback: any) => void;
    endDnd: (params: any, callback: any) => void;
    endSnooze: (params: any, callback: any) => void;
    setSnooze: (params: any, callback: any) => void;
    teamInfo: (params: any, callback: any) => void;
};
export default _default;
export default function dndendDnd(params: any, callback: any): void;
export default function dndendSnooze(params: any, callback: any): void;
export default function dndinfo(params: any, callback: any): void;
export default function dndsetSnooze(params: any, callback: any): void;
export default function dndteamInfo(params: any, callback: any): void;
export default function emojilist(params: any, callback: any): void;
export default function filescommentsadd(params: any, callback: any): void;
export default function filescommentsdelete(params: any, callback: any): void;
export default function filescommentsedit(params: any, callback: any): void;
declare var _default: {
    delete: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    upload: (params: any, callback: any) => void;
    comments: {
        add: (params: any, callback: any) => void;
        delete: (params: any, callback: any) => void;
        edit: (params: any, callback: any) => void;
    };
    revokePublicURL: (params: any, callback: any) => void;
    sharedPublicURL: (params: any, callback: any) => void;
};
export default _default;
export default function filesdelete(params: any, callback: any): void;
export default function filesinfo(params: any, callback: any): void;
export default function fileslist(params: any, callback: any): void;
export default function filesrevokePublicURL(params: any, callback: any): void;
export default function filessharedPublicURL(params: any, callback: any): void;
export default function filesupload(params: any, callback: any): void;
export default function groupsarchive(params: any, callback: any): void;
export default function groupsclose(params: any, callback: any): void;
export default function groupscreate(params: any, callback: any): void;
export default function groupscreateChild(params: any, callback: any): void;
declare var _default: {
    archive: (params: any, callback: any) => void;
    close: (params: any, callback: any) => void;
    create: (params: any, callback: any) => void;
    createChild: (params: any, callback: any) => void;
    history: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    invite: (params: any, callback: any) => void;
    kick: (params: any, callback: any) => void;
    leave: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    mark: (params: any, callback: any) => void;
    open: (params: any, callback: any) => void;
    rename: (params: any, callback: any) => void;
    setPurpose: (params: any, callback: any) => void;
    setTopic: (params: any, callback: any) => void;
    unarchive: (params: any, callback: any) => void;
};
export default _default;
export default function groupshistory(params: any, callback: any): void;
export default function groupsinfo(params: any, callback: any): void;
export default function groupsinvite(params: any, callback: any): void;
export default function groupskick(params: any, callback: any): void;
export default function groupsleave(params: any, callback: any): void;
export default function groupslist(params: any, callback: any): void;
export default function groupsmark(params: any, callback: any): void;
export default function groupsopen(params: any, callback: any): void;
export default function groupsrename(params: any, callback: any): void;
export default function groupssetPurpose(params: any, callback: any): void;
export default function groupssetTopic(params: any, callback: any): void;
export default function groupsunarchive(params: any, callback: any): void;
export default function imclose(params: any, callback: any): void;
declare var _default: {
    close: (params: any, callback: any) => void;
    history: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    mark: (params: any, callback: any) => void;
    open: (params: any, callback: any) => void;
};
export default _default;
export default function imhistory(params: any, callback: any): void;
export default function imlist(params: any, callback: any): void;
export default function immark(params: any, callback: any): void;
export default function imopen(params: any, callback: any): void;
declare var _default: {
    describe: string;
    api: {
        test: (params: any, callback: any) => void;
        client: (token: any) => {
            auth: {
                test: {};
            };
            bots: {
                info: {};
            };
            channels: {
                archive: {};
                create: {};
                history: {};
                info: {};
                invite: {};
                join: {};
                kick: {};
                leave: {};
                list: {};
                mark: {};
                rename: {};
                setPurpose: {};
                setTopic: {};
                unarchive: {};
            };
            chat: {
                delete: {};
                meMessage: {};
                postMessage: {};
                update: {};
            };
            dnd: {
                endDnd: {};
                endSnooze: {};
                info: {};
                setSnooze: {};
                teamInfo: {};
            };
            emoji: {
                list: {};
            };
            files: {
                comments: {
                    add: {};
                    delete: {};
                    edit: {};
                };
                delete: {};
                info: {};
                list: {};
                revokePublicURL: {};
                sharedPublicURL: {};
                upload: {};
            };
            groups: {
                archive: {};
                close: {};
                create: {};
                createChild: {};
                history: {};
                info: {};
                invite: {};
                kick: {};
                leave: {};
                list: {};
                mark: {};
                open: {};
                rename: {};
                setPurpose: {};
                setTopic: {};
                unarchive: {};
            };
            im: {
                close: {};
                history: {};
                list: {};
                mark: {};
                open: {};
            };
            mpim: {
                close: {};
                history: {};
                list: {};
                mark: {};
                open: {};
            };
            pins: {
                add: {};
                list: {};
                remove: {};
            };
            reactions: {
                add: {};
                get: {};
                list: {};
                remove: {};
            };
            reminders: {
                add: {};
                complete: {};
                delete: {};
                info: {};
                list: {};
            };
            rtm: {
                start: {};
            };
            search: {
                all: {};
                files: {};
                messages: {};
            };
            stars: {
                add: {};
                list: {};
                remove: {};
            };
            team: {
                accessLogs: {};
                billableInfo: {};
                info: {};
                integrationLogs: {};
                profile: {
                    get: {};
                };
            };
            usergroups: {
                create: {};
                disable: {};
                enable: {};
                list: {};
                update: {};
                users: {
                    list: {};
                    update: {};
                };
            };
            users: {
                deletePhoto: {};
                getPresence: {};
                identity: {};
                info: {};
                list: {};
                profile: {
                    get: {};
                    set: {};
                };
                setActive: {};
                setPhoto: {};
                setPresence: {};
            };
        };
    };
    auth: {
        test: (params: any, callback: any) => void;
    };
    bots: {
        info: (params: any, callback: any) => void;
    };
    channels: {
        archive: (params: any, callback: any) => void;
        create: (params: any, callback: any) => void;
        history: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        invite: (params: any, callback: any) => void;
        join: (params: any, callback: any) => void;
        kick: (params: any, callback: any) => void;
        leave: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        mark: (params: any, callback: any) => void;
        rename: (params: any, callback: any) => void;
        setPurpose: (params: any, callback: any) => void;
        setTopic: (params: any, callback: any) => void;
        unarchive: (params: any, callback: any) => void;
    };
    chat: {
        postMessage: (params: any, callback: any) => void;
        delete: (params: any, callback: any) => void;
        update: (params: any, callback: any) => void;
        meMessage: (params: any, callback: any) => void;
    };
    dnd: {
        info: (params: any, callback: any) => void;
        endDnd: (params: any, callback: any) => void;
        endSnooze: (params: any, callback: any) => void;
        setSnooze: (params: any, callback: any) => void;
        teamInfo: (params: any, callback: any) => void;
    };
    emoji: {
        list: (params: any, callback: any) => void;
    };
    files: {
        delete: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        upload: (params: any, callback: any) => void;
        comments: {
            add: (params: any, callback: any) => void;
            delete: (params: any, callback: any) => void;
            edit: (params: any, callback: any) => void;
        };
        revokePublicURL: (params: any, callback: any) => void;
        sharedPublicURL: (params: any, callback: any) => void;
    };
    groups: {
        archive: (params: any, callback: any) => void;
        close: (params: any, callback: any) => void;
        create: (params: any, callback: any) => void;
        createChild: (params: any, callback: any) => void;
        history: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        invite: (params: any, callback: any) => void;
        kick: (params: any, callback: any) => void;
        leave: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        mark: (params: any, callback: any) => void;
        open: (params: any, callback: any) => void;
        rename: (params: any, callback: any) => void;
        setPurpose: (params: any, callback: any) => void;
        setTopic: (params: any, callback: any) => void;
        unarchive: (params: any, callback: any) => void;
    };
    im: {
        close: (params: any, callback: any) => void;
        history: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        mark: (params: any, callback: any) => void;
        open: (params: any, callback: any) => void;
    };
    mpim: {
        close: (params: any, callback: any) => void;
        history: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        mark: (params: any, callback: any) => void;
        open: (params: any, callback: any) => void;
    };
    oauth: {
        access: (params: any, callback: any) => void;
    };
    reactions: {
        add: (params: any, callback: any) => void;
        get: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        remove: (params: any, callback: any) => void;
    };
    reminders: {
        add: (params: any, callback: any) => void;
        complete: (params: any, callback: any) => void;
        delete: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
    };
    pins: {
        add: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        remove: (params: any, callback: any) => void;
    };
    rtm: {
        client: () => {
            handlers: {
                started: any[];
            };
        };
        start: (params: any, callback: any) => void;
    };
    search: {
        all: (params: any, callback: any) => void;
        files: (params: any, callback: any) => void;
        messages: (params: any, callback: any) => void;
    };
    stars: {
        add: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        remove: (params: any, callback: any) => void;
    };
    team: {
        accessLogs: (params: any, callback: any) => void;
        billableInfo: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        integrationLogs: (params: any, callback: any) => void;
        profile: {
            get: (params: any, callback: any) => void;
        };
    };
    usergroups: {
        create: (params: any, callback: any) => void;
        disable: (params: any, callback: any) => void;
        enable: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        update: (params: any, callback: any) => void;
        users: {
            list: (params: any, callback: any) => void;
            update: (params: any, callback: any) => void;
        };
    };
    users: {
        getPresence: (params: any, callback: any) => void;
        identity: (params: any, callback: any) => void;
        info: (params: any, callback: any) => void;
        list: (params: any, callback: any) => void;
        profile: {
            get: (params: any, callback: any) => void;
            set: (params: any, callback: any) => void;
        };
        setActive: (params: any, callback: any) => void;
        setPresence: (params: any, callback: any) => void;
    };
};
export default _default;
export default function mpimclose(params: any, callback: any): void;
declare var _default: {
    close: (params: any, callback: any) => void;
    history: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    mark: (params: any, callback: any) => void;
    open: (params: any, callback: any) => void;
};
export default _default;
export default function mpimhistory(params: any, callback: any): void;
export default function mpimlist(params: any, callback: any): void;
export default function mpimmark(params: any, callback: any): void;
export default function mpimopen(params: any, callback: any): void;
export default function oauthaccess(params: any, callback: any): void;
export default function pinsadd(params: any, callback: any): void;
declare var _default: {
    add: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    remove: (params: any, callback: any) => void;
};
export default _default;
export default function pinslist(params: any, callback: any): void;
export default function pinsremove(params: any, callback: any): void;
export default function reactionsadd(params: any, callback: any): void;
declare var _default: {
    add: (params: any, callback: any) => void;
    get: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    remove: (params: any, callback: any) => void;
};
export default _default;
export default function reactionsget(params: any, callback: any): void;
export default function reactionslist(params: any, callback: any): void;
export default function reactionsremove(params: any, callback: any): void;
export default function remindersadd(params: any, callback: any): void;
export default function reminderscomplete(params: any, callback: any): void;
declare var _default: {
    add: (params: any, callback: any) => void;
    complete: (params: any, callback: any) => void;
    delete: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
};
export default _default;
export default function remindersdelete(params: any, callback: any): void;
export default function remindersinfo(params: any, callback: any): void;
export default function reminderslist(params: any, callback: any): void;
export default function client(): {
    handlers: {
        started: any[];
    };
};
export default function client(): {
    handlers: {
        started: any[];
    };
};
declare let events: string[];
export default events;
export default function rtmstart(params: any, callback: any): void;
export default function searchall(params: any, callback: any): void;
declare var _default: {
    all: (params: any, callback: any) => void;
    files: (params: any, callback: any) => void;
    messages: (params: any, callback: any) => void;
};
export default _default;
export default function searchfiles(params: any, callback: any): void;
export default function searchmessages(params: any, callback: any): void;
export default function starsadd(params: any, callback: any): void;
declare var _default: {
    add: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    remove: (params: any, callback: any) => void;
};
export default _default;
export default function starslist(params: any, callback: any): void;
export default function starsremove(params: any, callback: any): void;
export default function teamaccessLogs(params: any, callback: any): void;
export default function teambillableInfo(params: any, callback: any): void;
declare var _default: {
    accessLogs: (params: any, callback: any) => void;
    billableInfo: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    integrationLogs: (params: any, callback: any) => void;
    profile: {
        get: (params: any, callback: any) => void;
    };
};
export default _default;
export default function teaminfo(params: any, callback: any): void;
export default function teamintegrationLogs(params: any, callback: any): void;
export default function teamprofileget(params: any, callback: any): void;
export default function usergroupscreate(params: any, callback: any): void;
declare var _default: {
    create: (params: any, callback: any) => void;
    disable: (params: any, callback: any) => void;
    enable: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    update: (params: any, callback: any) => void;
    users: {
        list: (params: any, callback: any) => void;
        update: (params: any, callback: any) => void;
    };
};
export default _default;
export default function usergroupsdisable(params: any, callback: any): void;
export default function usergroupsenable(params: any, callback: any): void;
export default function usergroupslist(params: any, callback: any): void;
export default function usergroupsupdate(params: any, callback: any): void;
export default function usergroupsuserslist(params: any, callback: any): void;
export default function usergroupsusersupdate(params: any, callback: any): void;
declare var _default: {
    getPresence: (params: any, callback: any) => void;
    identity: (params: any, callback: any) => void;
    info: (params: any, callback: any) => void;
    list: (params: any, callback: any) => void;
    profile: {
        get: (params: any, callback: any) => void;
        set: (params: any, callback: any) => void;
    };
    setActive: (params: any, callback: any) => void;
    setPresence: (params: any, callback: any) => void;
};
export default _default;
export default function usersdeletePhoto(params: any, callback: any): void;
export default function usersgetPresence(params: any, callback: any): void;
export default function usersidentity(params: any, callback: any): void;
export default function usersinfo(params: any, callback: any): void;
export default function userslist(params: any, callback: any): void;
export default function usersprofileget(params: any, callback: any): void;
export default function usersprofileset(params: any, callback: any): void;
export default function userssetActive(params: any, callback: any): void;
export default function userssetPhoto(params: any, callback: any): void;
export default function userssetPresence(params: any, callback: any): void;
export default function exec(url: any, form: any, callback: any): void;
export default function validate(method: any, params: any): boolean;

 */
