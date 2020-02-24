export class LocalStorageService {
    public getItem(key: string): any {
        let result = localStorage.getItem(key);
        if (typeof result === 'string') {
            result = JSON.parse(result);
        }
        return result;
    }
    public setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    public clear(): void {
        localStorage.clear();
    }
}