export class LocalStorageService {

    public getItem(key: string): any {
        let result = localStorage.getItem(key);
        return result;
    }

    public setItem(key: string, value: any): void {
        localStorage.setItem(key, value);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}