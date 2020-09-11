import Seiheki from "../../types/Seiheki"
import SeihekiComment from "../../types/SeihekiComment"
import Collection from "../../types/Collection"

export default class Client {
    host: string;

    constructor(host: string) {
        this.host = host;
    }

    /**
     * @param {string} author
     * @param {string} content
     * @return {Promise<number>} seihekiId of a new Seiheki
     */
    async postSeihekis(author: string, content: string): Promise<number> {
        if (author === '' || content === '') {
            throw new Error('An author or a content is not filled.');
        }
        const body = [
                "seihekiContent=" + encodeURIComponent(content),
                "seihekiAuthor=" + encodeURIComponent(author),
                "seihekiUpvotes=" + encodeURIComponent(0)
            ].join("&");
        return fetch(this.host + '/v3/seihekis', {
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .then(res => res.json());
    }

    async getSeiheki(seihekiId: number): Promise<Seiheki> {
        return fetch(this.host + '/v3/seihekis/' + seihekiId, {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => res.json())
            .then(seiheki => {
                return { seihekiId, ...seiheki };
            });
    }

    async getSeihekis(author: string, limit: number, offset: number = 0, q: string = ""): Promise<Collection<Seiheki>> {
        const query: any = { author: author, offset: offset + "", limit: limit + "", q: q };
        return fetch(this.host + '/v3/seihekis?' + new URLSearchParams(query), {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => res.json())
            .then(res => {
                return {
                    ...res,
                    collection: res.collection.map(toSeiheki)
                };
            });
    }

    /**
     * @param {number} seihekiId
     * @param {string} author
     * @param {string} content
     * @param {number} upvotes
     * @return {Promise<number>} commentId
     */
    async postSeihekiComment(seihekiId: number, author: string, content: string): Promise<number> {
        if (author === '' || content === '') {
            throw new Error('InvalidArgumentError');
        }
        const body = [
                "commentContent=" + encodeURIComponent(content),
                "commentAuthor=" + encodeURIComponent(author),
                "commentUpvotes=" + encodeURIComponent(0)
            ].join("&");
        return fetch(this.host + '/v3/seihekis/' + seihekiId + '/comments', {
                method: 'POST',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .then(res => res.json());
    }

    /**
     * @param {number} seihekiId
     * @param {number} seihekiCommentId
     * @return {Promise<SeihekiComment>} Seiheki comment
     */
    async getSeihekiComment(seihekiId: number, seihekiCommentId: number): Promise<SeihekiComment> {
        const url = this.host + '/v3/seihekis/' + seihekiId + '/comments/' + seihekiCommentId;
        return fetch(url, { method: 'GET', mode: 'cors' })
            .then(res => res.json())
            .then(comment => {
                return {commentId: seihekiCommentId, ...comment};
            });
    }

    /**
     * @param {number} seihekiId
     * @param {number} seihekiCommentId
     * @return {Promise<void>} Nothing
     */
    async patchSeihekiCommentUpvotes(seihekiId: number, seihekiCommentId: number): Promise<void> {
        const url = this.host + '/v3/seihekis/' + seihekiId + '/comments/' + seihekiCommentId + '/upvotes/';
        return fetch(url, {
                method: 'PATCH',
                mode: 'cors',
                body: "patchOp=increment",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .then(() => {});
    }

    /**
     * @param seihekiId
     * @return Nothing
     */
    async patchSeihekiUpvotes(seihekiId: number): Promise<void> {
        return fetch(this.host + '/v3/seihekis/' + seihekiId + '/upvotes', {
                method: 'PATCH',
                mode: 'cors',
                body: "patchOp=increment",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
            .then(() => {});
    }

    /**
     * Make a deck from seihekis which is not consumed yet.
     * @return Nothing
     */
    async postCards(): Promise<void> {
        return fetch(this.host + '/v3/cards', {
                method: 'POST',
                mode: 'cors'
            })
            .then(() => {});
    }

    /**
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<Collection<Seiheki>>} Deck
     */
    async getCards(limit: number, offset: number = 0): Promise<Collection<Seiheki>> {
        const query = { offset: offset.toString(), limit: limit.toString() };
        return fetch(this.host + '/v3/cards?' + new URLSearchParams(query), {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => res.json())
            .then(res => {
                return {
                    ...res,
                    collection: res.collection.map(toSeiheki)
                };
            });
    }

    /**
     * Removes a seiheki from a deck.
     * @param seihekiId
     * @return Nothing
     */
    async deleteCard(seihekiId: number): Promise<void> {
        return fetch(this.host + '/v3/cards/' + seihekiId, {
                method: 'DELETE',
                mode: 'cors'
            })
            .then(() => {})
    }

    /**
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<Collection<Seiheki>>} Collection of consumed seihekis.
     */
    async getHistories(limit: number, offset: number = 0): Promise<Collection<Seiheki>> {
        const query = { offset: offset.toString(), limit: limit.toString() };
        return fetch(this.host + '/v3/histories?' + new URLSearchParams(query), {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => res.json())
            .then(res => {
                return {
                    ...res,
                    collection: res.collection.map(toSeiheki)
                };
            });
    }
}

function toSeiheki([seihekiId, seiheki]: any): Seiheki {
    return { seihekiId: seihekiId, ...seiheki};
}
