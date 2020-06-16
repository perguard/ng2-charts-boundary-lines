import {Injectable} from '@angular/core';
import {ChartDataSets, ChartPoint} from 'chart.js';
import BoundaryChartDataSets from './boundary-chart-datasets.model';

@Injectable({
  providedIn: 'root'
})
export class ChartPointsFittingService {

  constructor() {
  }

  public fitOutputData(outputData: ChartDataSets[], chartData: BoundaryChartDataSets[], dataIndex, pointIndex): void {
    const draggedDataset: ChartPoint[] = chartData[dataIndex].data as ChartPoint[];
    if ((pointIndex - 1) >= 0) {
      this.interpolateOutputData(outputData, draggedDataset[pointIndex - 1], draggedDataset[pointIndex], dataIndex);
    }
    if ((pointIndex + 1) < draggedDataset.length) {
      this.interpolateOutputData(outputData, draggedDataset[pointIndex], draggedDataset[pointIndex + 1], dataIndex);
    }
  }

  private interpolateOutputData(outputData: ChartDataSets[], p0: ChartPoint, p1: ChartPoint, datasetIndex: number): void {
    const dataFromPoToP1 = (outputData[datasetIndex].data as ChartPoint[]).filter(p => p.x >= p0.x && p.x <= p1.x);
    const slope = ((p1.y as number) - (p0.y as number)) / dataFromPoToP1.length;
    dataFromPoToP1.forEach((tmpChartPoint, index) => tmpChartPoint.y = (slope * index) + (p0.y as number));
  }

}