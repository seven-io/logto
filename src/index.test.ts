import createConnector from './index.js';
import { mockedConfig } from './mock.js';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

describe('Seven SMS connector', () => {
  it('init without throwing errors', async () => {
    await expect(createConnector({ getConfig })).resolves.not.toThrow();
  });
});
