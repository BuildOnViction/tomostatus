const express = require('express')
const axios = require('axios')
const config = require('config')
const urljoin = require('url-join')
const router = express.Router()
const request = axios.create({
    headers: { Authorization: `Bearer ${config.get('grafana.apiKey')}` }
})

router.get('/', async function (req, res, next) {
    /* eslint-disable */
    try {
        const q = {
            q: `
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'RPC' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'DAPP' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMODEX' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOSCAN' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOBRIDGE' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOWALLET' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOCHAIN' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOMASTER' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMODOCS' AND "status" = 'failed') AND time >= now() - 89d GROUP BY time(1d) fill(0)
            `,
            db: 'product',
            epoch: 'ms'
        }
        /* eslint-enable */
        const url = urljoin(config.get('grafana.uri'), 'api/datasources/proxy/6/query')
        const data = await request.get(url, {
            params: q
        })
        /* [
            timestamp date,
            number of failed value
            ]
        */
        const result = data.data
        return res.json(result)
    } catch (error) {
        return next(error)
    }
})

router.get('/today', async function (req, res, next) {
    /* eslint-disable */
    try {
        const q = {
            q: `
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'RPC' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'DAPP' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMODEX' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOSCAN' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOBRIDGE' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOWALLET' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOCHAIN' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMOMASTER' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0);
            SELECT sum("value") FROM "statuses" WHERE ("env" = 'MAINNET' AND "product" = 'TOMODOCS' AND "status" = 'failed') AND time >= now() - 1d GROUP BY time(1d) fill(0)
            `,
            db: 'product',
            epoch: 'ms'
        }
        /* eslint-enable */
        const url = urljoin(config.get('grafana.uri'), 'api/datasources/proxy/6/query')
        const data = await request.get(url, {
            params: q
        })
        /* [
            timestamp date,
            number of failed value
            ]
        */
        const result = data.data
        return res.json(result)
    } catch (error) {
        return next(error)
    }
})

module.exports = router
